import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User, UserWithId, UserFieldsEnum } from './types';
import { Op } from 'sequelize';
import { Messages, DbError, ERR } from '../../types/Utils';
import { checkFields } from './utils';

const model = require('../../models/index');

export class UsersController {
  private comparePassword = (password: string, hash: string, callback: Function) => {
    bcrypt.compare(password, hash, (err: Error, isMatch: boolean) => {
      if (err) {
        throw err;
      }

      callback(null, isMatch);
    });
  }

  public createUser = async (req: Request, res: Response) => {
    const check = checkFields(req.body);

    if (check.error) {
      return res.status(400).send({
        success: false,
        message: check.error
      });
    }

    const { email, password, username } = req.body as User;

    const exist: UserWithId = await model.User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: email }
        ]
      }
    });

    if (exist) {
      return res.status(409).send({
        success: false,
        message: 'User already exists',
      });
    }

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(5));

    const newUser: UserWithId | DbError = await model.User.create({
      username: username,
      email: email,
      password: hash,
    }).catch(error => ({ error }));

    if (ERR in newUser) {
      res.status(500).send({
        success: false,
        message: Messages.ServerError,
      });
      throw newUser[ERR];
    }

    res.status(200).send({
      success: true,
      data: newUser,
      message: 'User successfully created',
    });
  }

  public login = async (req: Request, res: Response): Promise<Response | void> => {
    const { password, username } = req.body;

    if (!password || !username) {
      return res.status(400).send({
        success: false,
        message: Messages.IncorrectLoginPassword,
      });
    }

    const user: UserWithId = await model.User.findOne({
      where: { username }
    });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: Messages.IncorrectLoginPassword,
      });
    }

    this.comparePassword(password, user.password, (err: Error, isMatch: boolean) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: Messages.ServerError,
        });
        throw err;
      }

      if (!isMatch) {
        return res.status(401).send({
          success: false,
          message: Messages.IncorrectLoginPassword,
        });
      }

      // login for 1 year
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, {
        expiresIn: '1y'
      });

      const userData: Partial<UserWithId> = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      return res.status(200).send({
        success: true,
        token: 'JWT ' + token,
        data: userData,
        message: Messages.Ok,
      });
    });
  }

  public getUserById = async (id: number, callback: Function): Promise<void> => {
    const user: UserWithId | DbError = await model.User.findOne({
      where: { id }
    })
      .catch(error => ({ error }));

    if (ERR in user) {
      throw user[ERR];
    } else {
      callback(null, user);
    }
  }

  public getUsers = async (req: Request, res: Response) => {
    const users: UserWithId[] | DbError = await model.User.findAll({
      attributes: [UserFieldsEnum.email, UserFieldsEnum.username, 'id']
    })
      .catch(error => ({ error }));;

    if (ERR in users) {
      res.status(500).send({
        success: false,
        message: Messages.ServerError
      });
      throw users[ERR];
    } else {
      return res.status(200).send({
        success: true,
        message: Messages.Ok,
        data: users,
      });
    }
  }

  public getUserProfile = async (req: Request, res: Response) => {
    const userData = req.user as UserWithId;

    const user: Partial<UserWithId> = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
    };
    return res.status(200).send({
      success: true,
      message: Messages.Ok,
      data: user,
    });
  }
}

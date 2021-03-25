import { Request, Response } from 'express';
import { ContactWithId, Contact } from './types';
import { Messages, DbError, ERR } from '../../types/Utils';

const model = require('../../models/index');

export class ContactsController {

  public getContacts = async (req: Request, res: Response) => {
    const contacts: ContactWithId[] = await model.Contact.findAll({});

    if (contacts) {
      res.status(200).send({
        success: true,
        message: Messages.Ok,
        data: contacts,
      });
    } else {
      res.status(500).send({
        success: false,
        message: Messages.ServerError
      });
    }
  }

  public createContact = async (req: Request, res: Response) => {
    const { identify, name } = req.body as Contact;

    const existing: ContactWithId = await model.Contact.findOne({
      where: { identify }
    });

    if (existing?.id) {
      return res.status(409).send({
        success: false,
        message: 'Contact is already created',
        data: existing,
      });
    }

    const created: ContactWithId | DbError = await model.Contact.create({
      identify, name
    }).catch(error => ({ error }));

    if (ERR in created) {
      res.status(500).send({
        success: false,
        message: Messages.ServerError,
      });
      throw created[ERR];
    } else {
      return res.status(200).send({
        success: true,
        message: 'Contact successfully created',
        data: created,
      });
    }
  }

  public updateContact = async (req: Request, res: Response) => {
    const { name } = req.body as Contact;
    const identify = req.params.identify as Contact['identify'];

    const contact: ContactWithId = await model.Contact.findOne({
      where: { identify }
    });

    if (!contact) {
      return res.status(404).send({
        success: false,
        message: 'Contact is not found!',
      });
    }

    const updated = await model.Contact.update({ name }, {
      where: { identify }
    });

    // TODO: return updated data from update request
    const contactUpdated: ContactWithId = await model.Contact.findOne({
      where: { identify }
    }).catch(error => ({ error }));

    if (ERR in updated) {
      res.status(500).send({
        success: false,
        message: Messages.ServerError,
      });
      throw updated[ERR];
    } else {
      return res.status(200).send({
        success: true,
        message: 'Contact successfully updated',
        data: contactUpdated,
      });
    }
  }

  public getContact = async (req: Request, res: Response) => {
    const identify = req.params.identify as Contact['identify'];

    const contact: ContactWithId = await model.Contact.findOne({
      where: { identify }
    });

    if (!contact) {
      return res.status(404).send({
        success: false,
        message: 'Contact is not found!',
      });
    }

    return res.status(200).send({
      success: true,
      message: Messages.Ok,
      data: contact,
    });
  }

  public deleteContact = async (req: Request, res: Response) => {
    const identify = req.params.identify as Contact['identify'];

    const contact: ContactWithId = await model.Contact.findOne({
      where: { identify }
    });

    if (!contact) {
      return res.status(404).send({
        success: false,
        message: 'Contact is not found!',
      });
    }

    const deleted = await model.Contact.destroy({
      where: { identify }
    });

    if (deleted) {
      return res.status(200).send({
        success: true,
        message: 'Contact removed successfully!',
      });
    }
  }
}

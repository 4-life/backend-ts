import { Request, Response, Application, NextFunction } from 'express';
import * as passport from 'passport';
import { UsersController } from './controllers/Users';
import { ContactsController } from './controllers/Contacts';

export class Routes {
  private userController: UsersController;
  private contactsController: ContactsController;

  private auth = passport.authenticate('jwt', { session: false });

  constructor(userController: UsersController, contactsController: ContactsController) {
    this.userController = userController;
    this.contactsController = contactsController;
  }

  public routes(app: Application): void {
    /**
     * @api {post} /signup
     * @apiPermission public request
     * @apiDescription User Registration
     *
     * @apiHeader none
     *
     * -> userController.createUser
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     *    {
     *       data: {user data}
     *    }
     */
    app.post('/signup', (req: Request, res: Response) => this.userController.createUser(req, res));

    /**
     * @api {post} /login
     * @apiPermission public request
     * @apiDescription User Login
     *
     * @apiHeader none
     *
     * -> userController.login
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     *    {
     *       data: {user data}
     *    }
     */
    app.post('/login', (req: Request, res: Response) => this.userController.login(req, res));

    /**
     * @api {get} /profile
     * @apiPermission authenticated request
     * @apiDescription Get user profile
     *
     * @apiHeader {'Authorization': token}
     *
     * -> contactsController.getContacts
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     *    {
     *       data: {user data}
     *    }
     */
    app.get('/profile', this.auth, (req: Request, res: Response) => this.userController.getUserProfile(req, res));

    /**
     * @api {post} /contacts
     * @apiPermission public request
     * @apiDescription Create contact
     *
     * @apiHeader {}
     *
     * -> contactsController.createContact
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     *    {
     *       data: {contact}
     *    }
     */
    app.post('/contacts', (req: Request, res: Response) => this.contactsController.createContact(req, res));

    /**
     * @api {get} /contacts
     * @apiPermission public request
     * @apiDescription Get contacts
     *
     * @apiHeader {}
     *
     * -> contactsController.getContacts
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     *    {
     *       data: {contacts list}
     *    }
     */
    app.get('/contacts', (req: Request, res: Response) => this.contactsController.getContacts(req, res));

    /**
     * @api {put} /contacts/{identify}
     * @apiPermission public request
     * @apiDescription Update contact
     *
     * @apiHeader {}
     *
     * -> contactsController.updateContact
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     *    {
     *       data: {contact}
     *    }
     */
     app.put('/contacts/:identify', (req: Request, res: Response) => this.contactsController.updateContact(req, res));

    /**
     * @api {get} /contacts{identify}
     * @apiPermission public request
     * @apiDescription Get contact
     *
     * @apiHeader {}
     *
     * -> contactsController.getContact
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     *    {
     *       data: {contact}
     *    }
     */
     app.get('/contacts/:identify', (req: Request, res: Response) => this.contactsController.getContact(req, res));


    /**
     * @api {delete} /contacts{identify}
     * @apiPermission public request
     * @apiDescription Delete contact
     *
     * @apiHeader {}
     *
     * -> contactsController.deleteContact
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     */
     app.delete('/contacts/:identify', (req: Request, res: Response) => this.contactsController.deleteContact(req, res));

    /**
     * @api {get} /users
     * @apiPermission public request
     * @apiDescription Get users
     *
     * @apiHeader {'Authorization': token}
     *
     * -> userController.getUsers
     *
     * @apiResponse Success:
     *    HTTP 200 OK
     *    {
     *       data: {users list}
     *    }
     */
    app.get('/users', this.auth, (req: Request, res: Response) => this.userController.getUsers(req, res));

    /**
     * 404 Status if no route matched
     *
     * @apiResponse:
     *   HTTP 404 NOT FOUND
     *   {
     *     "error": "Endpoint not found"
     *   }
     */
    app.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`Endpoint not found: ${req.originalUrl}`);
      res.status(404).json({ error: 'Not found' });
      next();
    });
  }
}

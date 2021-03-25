import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as cors from 'cors';
import { Routes } from './routes';
import { PassportConfig } from './config/passport';
import { UsersController } from './controllers/Users';
import { ContactsController } from './controllers/Contacts';

class App {
  public app: express.Application;

  protected userController: UsersController;
  protected contactsController: ContactsController;
  public routePrv: Routes;

  constructor() {
    this.app = express();
    this.config();

    new PassportConfig(passport);

    this.userController = new UsersController();
    this.contactsController = new ContactsController();
    this.routePrv = new Routes(this.userController, this.contactsController);
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(cors());
    // support application/json type post data
    this.app.use(bodyParser.json());
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.disable('x-powered-by');

    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

}


export default new App().app;

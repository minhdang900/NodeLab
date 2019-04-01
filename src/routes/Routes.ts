import {Request, Response, NextFunction} from "express";
import { ContactController } from "../controllers/ContactController";

export class Routes { 
    
    public contactController: ContactController = new ContactController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'Hello'
            })
        })
        
        // Contact 
        app.route('/contact')
        .get(this.middleware, this.contactController.getContacts)        

        // POST endpoint
        .post(this.contactController.addNewContact);

        // Contact detail
        app.route('/contact/:contactId')
        // get specific contact
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact)

    }
    private middleware (req: Request, res: Response, next: NextFunction) {
        // middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);            
        next();                      
    }
}
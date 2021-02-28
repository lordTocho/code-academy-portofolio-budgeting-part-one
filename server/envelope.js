// the router that handles all of the functions for processing envelope budgeting
const envelopeRouter = require('express').Router();
module.exports = envelopeRouter;

// container of the envelopes
// the envelopes going to contain the name of the envelope and the balance
const collectionOfEnvelopes = require('../model/data');

const { processEnvelopeEntry, retrieveEnvelope, updateEnvelopeEntry, deleteEnvelopeEntry, transferFunds, totalEnvelopeBudget } = require('../service/envelopeService');

// retrieve all of the envelopes
envelopeRouter.get('/', (req, res, next) => {
    let totalBudget = totalEnvelopeBudget();
    res.send({ Budget: collectionOfEnvelopes,
               Total: totalBudget} )
})

envelopeRouter.get('/:name', (req, res, next) => {
    let queryEnvelopeName = req.params.name;
    console.log( `Searching for ${queryEnvelopeName}` );

    let result = retrieveEnvelope( queryEnvelopeName );
    if( result != null ) {
        console.log( `Record found! Envelope data Envelope: ${result.envelope} Result: ${result.balance}` );
        res.send({ envelope: result.envelope,
                   balance:  result.balance
                });
    }
    else {

        res.status( 404 ).send("Envelope not found.");
    }
})

envelopeRouter.post('/', (req, res, next) => {
    let newEnvelope = {
        envelope: req.query.envelope,
        balance:  Number( req.query.balance ),
    };
    // validating that entry is correct
    if( processEnvelopeEntry( newEnvelope ) ) {
        console.log( `Envelope: ${newEnvelope.envelope} Balance: ${newEnvelope.balance}` );
        res.status( 200 ).send();
    }
    else {
        console.log("Invalid entry");
        res.status( 404 ).send();
    }
    
})

envelopeRouter.put('/:name', (req, res, next) => {
    let envelopeToSearch = {
        envelope: req.query.envelope,
        balance:  Number( req.query.balance ),
    };
    
    console.log( "Attempting to update budget envelope record" );
    if( updateEnvelopeEntry( envelopeToSearch ) ) {
        console.log( "Updated record complete." );
        res.status(200).send({ response: "Updated record complete." })
    }
    else {
        console.log( "Updated record failed" );
        res.status(404).send({ response: "Updated record failed." })
    }
});

envelopeRouter.post('/transfer', (req, res, next) => {
    let envelopeOne = req.query.envelopeOne;
    let envelopeTwo = req.query.envelopeTwo;

    if( transferFunds( envelopeOne, envelopeTwo ) ) {
        console.log(`Transfer of ${envelopeOne} to ${envelopeTwo} complete`);
        res.send({ response: `Transfer of ${envelopeOne} to ${envelopeTwo} complete` });
    }
    else {
        console.log(`Transfer of ${envelopeOne} to ${envelopeTwo} failed`);
        res.status( 404 ).send( { response: `Transfer of ${envelopeOne} to ${envelopeTwo} failed` } )
    }
});

envelopeRouter.delete( '/:name', (req, res, next) => {
    let envelopeToBeDeleted = req.params.name;

    console.log( "Attempting to delete budget envelope record...." )
    if( deleteEnvelopeEntry( envelopeToBeDeleted ) ) {
        console.log( "Record deletion complete." );
        res.status(200).send({ response: "Record deletion complete." })
    }
    else {
        console.log( "Record deletion complete. failed" );
        res.status(404).send({ response: "Record deletion complete. failed." })
    }
});
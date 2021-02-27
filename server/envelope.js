// the router that handles all of the functions for processing envelope budgeting
const envelopeRouter = require('express').Router();
module.exports = envelopeRouter;

// container of the envelopes
// the envelopes going to contain the name of the envelope and the balance
const collectionOfEnvelopes = require('../model/data');

const { processEnvelopeEntry, retrieveEnvelope } = require('../service/envelopeService');

// retrieve all of the envelopes
envelopeRouter.get('/', (req, res, next) => {
    res.send(collectionOfEnvelopes)
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
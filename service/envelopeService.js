const collectionOfEnvelopes = require('../model/data');

function retrieveEnvelope( envelopeName ) {
    let result = collectionOfEnvelopes.find( element => element.envelope === envelopeName)

    if( result != null ) {
        console.log( `Found envelope ${result.envelope}! Returning info to caller now...` );
        return result;
    }
    console.log( `Unable to find record ${envelopeName}` );
    return null;

}

function processEnvelopeEntry( newEnvelope ) {
    
    if( newEnvelope.envelope != null && typeof newEnvelope.balance === "number" ) {
        console.log( "New budget entry has proper values" );
        collectionOfEnvelopes.push( newEnvelope );

        return true;
    }
    console.log("Unable to process budget envelope entry")
    return false;
}

module.exports = { processEnvelopeEntry, retrieveEnvelope }
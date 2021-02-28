let collectionOfEnvelopes = require('../model/data');

// handles all of the "behind the scenes" CRUD operations for the envelopes

function totalEnvelopeBudget() {
    let totalBudget = 0;

    collectionOfEnvelopes.forEach( element => totalBudget += element.balance );

    return totalBudget;
}

function checkForRecordExist( newEnvelope ) {
   let result = collectionOfEnvelopes.find( element => element === newEnvelope )

   if( result != null ) {
       console.log( "Budget Envelope does exist" )
       return false;
   }
   console.log( "Budget Envelope does not exist" )
   return true;
    
}

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
    
    if( checkForRecordExist( newEnvelope ) ) {
        console.log( "New budget entry has proper values" );
        collectionOfEnvelopes.push( newEnvelope );

        return true;
    }
    console.log("Unable to process budget envelope entry")
    return false;
}

function updateEnvelopeEntry( envelopeToBeUpdated ) {
    let result = retrieveEnvelope( envelopeToBeUpdated.envelope );

    if( result != null ) {
        console.log( "Budget envelope record exist! Making updates now" )
        let indexToUpdate = collectionOfEnvelopes.findIndex( element => element === result );

        collectionOfEnvelopes[ indexToUpdate ].envelope = envelopeToBeUpdated.envelope;
        collectionOfEnvelopes[ indexToUpdate ].balance = envelopeToBeUpdated.balance;

        return true;
    }
    return false;
}

function deleteEnvelopeEntry( envelopeToBeDeleted ) {
    let result = retrieveEnvelope( envelopeToBeDeleted );

    if ( result != null ) {
        console.log( "Budget envelope record exist! Deleting record now" );
        let indexToUpdate = collectionOfEnvelopes.findIndex( element => element === result );
        collectionOfEnvelopes.splice( indexToUpdate, 1 );
        return true;
    }
    return false;
}

function transferFunds( envelopeOne, envelopeTwo ) {
    let budgetOne = retrieveEnvelope( envelopeOne );
    let budgetTwo = retrieveEnvelope( envelopeTwo );

    // transfer funds from budgetOne to budgetTwo
    console.log(`Transferring funds from ${budgetOne.envelope} to ${budgetTwo.envelope}`);

    budgetTwo.balance += budgetOne.balance;

    // zeroing out budget
    budgetOne.balance -= budgetOne.balance;

    // adding the updated objects back to the array
    if( updateEnvelopeEntry( budgetOne  ) && updateEnvelopeEntry( budgetTwo ) ) {
        console.log( "Transfer complete" );
        return true;
    }
    console.log("Funds transfer failed.");
    return false;
}

module.exports = { processEnvelopeEntry, retrieveEnvelope, updateEnvelopeEntry, deleteEnvelopeEntry, transferFunds, totalEnvelopeBudget }
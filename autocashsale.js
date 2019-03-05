function credit(){

    /* Create a Transaction saved search that would pull up all the sales orders via Script as show below. Filters and Columns refer to Criteria and Results */
    
    var soInfo = nlapiSearchRecord('salesorder', null,
    // Select Criteria and Results
    
    [ 
      new nlobjSearchFilter('internalid', null, 'is', nlapiGetFieldValue('createdfrom')),
      new nlobjSearchFilter('mainline', null, 'is', 'T'),
      new nlobjSearchFilter('source', null, 'is', 'Web Services'),
      new nlobjSearchFilter('paymentmethod', null, 'anyof', ('16', '17', '18', '19', '20'))
     ], [
      new nlobjSearchColumn('statusref'),
      new nlobjSearchColumn('terms'),
      new nlobjSearchColumn('tranid')
     ]);
    
    //  if the status of sales order is Fulfilled then transform record to a cash sale
    if('pendingBilling' == (soInfo ? soInfo[0].getValue('statusref') : '-na-')){
     // then auto bill, place the code in try/catch block to handle errors
     try{
    // Log the terms value
    
    nlapiLogExecution('DEBUG', 'auto billing sales order with terms: '+ soInfo[0].getValue('terms'));
    //  Transform Record to a Cash Sale and submit it
    
     var billRec  = nlapiTransformRecord('salesorder', nlapiGetFieldValue('createdfrom'), (soInfo[0].getValue('terms')) ? 'invoice' : 'cashsale' );
      nlapiSubmitRecord(billRec);
     }catch(e){
    
    //if any error occurs it will be caught here and logged with the stack trace
      nlapiLogExecution("ERROR", "error billing order: "+ soInfo[0].getValue('tranid'), (e.message || e.toString()) + (e.getStackTrace ? '\n\n'+ e.getStackTrace().join('\n') : ''));
    
    // This is optional, to create note which will store the error information on the transaction record
      var n = nlapiCreateRecord('note');
      n.setFieldValue('transaction', nlapiGetFieldValue('createdfrom'));
      n.setFieldValue('title', "Billing Issue:"+ (e.message || e.toString()));
      n.setFieldValue('note', "Error billing order "+ soInfo[0].getValue('tranid')  +"\n\n"+ (e.message || e.toString()) + (e.getStackTrace ? '\n\n'+ e.getStackTrace().join('\n') : ''));
      nlapiSubmitRecord(n);
     }
    }
    }
    
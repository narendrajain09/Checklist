({
    doInit : function(component, event, helper) {
        
        helper.fetchPickListVal(component, 'Type__c');
        console.log(component.get("V.recordId"));
        
        // Prepare a new Checklist from template
        component.find("checklistRecordCreator").getNewRecord(
            "Checklist__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newChecklist");
                var error = component.get("v.ErrorMessage");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
                
            })
        );
    },
    createChecklist: function(component, event, helper) {
        if(component.get("v.newChecklistFields.Name")  != null  && component.get("v.newChecklistFields.Type__c")){   
            component.find("checklistRecordCreator").saveRecord(function(response) {
                if (response.state === "SUCCESS" || response.state === "DRAFT") {
                    // record is saved successfully
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": $A.get("$Label.c.Checklist_Success_Message"),
                        "type": "success"
                    });
                    resultsToast.fire();
                } else if (response.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (response.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving contact, error: ' + 
                                JSON.stringify(response.error));
                } else {
                    console.log('Unknown problem, state: ' + response.state +
                                ', error: ' + JSON.stringify(response.error));
                }
            });
            var refreshEvent = component.getEvent("RefreshEvent");
            refreshEvent.fire();
        }
        else
        {
            component.set("v.hasRequiredError", "True");  
        }
        
        
    }
})
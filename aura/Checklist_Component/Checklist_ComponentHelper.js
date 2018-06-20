({
    fetchChecklistInfo : function(component, event, helper) {
        var fetchCheckListInfo = component.get("c.getCheckListInfo");
        fetchCheckListInfo.setCallback(this, function(response){
            var returnValue = response.getReturnValue();
            if(response.getState() == 'SUCCESS'){
                component.set("v.hasError", false);
                component.set("v.hasChecklist", returnValue.hasChecklist);
                component.set("v.Checklist", returnValue.Checklist);
                component.set("v.ChecklistItems", returnValue.ChecklistItems);
                if(component.get("v.ChecklistItems")!= null){
                    component.set("v.ChecklistItemCount", returnValue.ChecklistItems.length);   
                }
            }else{
                component.set("v.hasError", true);
            }
            
            component.set("v.ShowSpinner", false);
        });
        
        $A.enqueueAction(fetchCheckListInfo);
    },
    
    showSpinner : function(component, event, helper){
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
    },
    
    hideSpinner : function(component, event, helper){
        var spinner = component.find("spinner");
        $A.util.addClass(spinner, "slds-hide");
    },
    
    createRecord: function(component, event, helper, auraId) {
        component.find(auraId).saveRecord(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // record is saved successfully
                var resultsToast = $A.get("e.force:showToast");
                resultsToast.setParams({
                    "title": "Saved",
                    "message": $A.get("$Label.c.Checklist_Item_Success_Message"),
                    "type": "success"
                });
                resultsToast.fire();
                component.set("v.ShowSpinner", true);
                helper.fetchChecklistInfo(component, event, helper);
                
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving contact, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
            
        });
    },
    deleteItem : function(component, event, helper) {
        var deleteAction = component.get("c.deleteChecklistItem");
        deleteAction.setParams({"recordId" : component.get("v.Checklist").Id});
        deleteAction.setCallback(this, function(response){
            var modal = component.find("confirm");
            $A.util.addClass(modal, "slds-hide");
            component.set("v.ShowSpinner", false);
            if(response.getState() == 'SUCCESS'){
                component.set("v.hasChecklist", false);
                component.set("v.Checklist", null);
                component.set("v.ChecklistItems", []);
                helper.showToast($A.get("$Label.c.Checklist_Item_Delete_Success_Message"), false);
            }
            else{
                helper.showToast($A.get("$Label.c.Checklist_Item_Delete_Error_Message"), true);
            }
            
             
        });
        
        component.set("v.ShowSpinner", true);
        $A.enqueueAction(deleteAction);
    },
    
})
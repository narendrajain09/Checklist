({
    updateItem : function(component, event, helper, completed) {
        var checklistItem = component.get("v.ChecklistItem");
        checklistItem.Completed__c = completed;
        var updateItem = component.get("c.updateChecklistItem");
        updateItem.setParams({
            "recordId" : checklistItem.Id,
            "completed" : completed
        });
        updateItem.setCallback(this, function(response){
            component.set("v.ShowSpinner", false);
            if(response.getState() == 'SUCCESS'){
                component.set("v.ChecklistItem", checklistItem);
                helper.showToast($A.get("$Label.c.Checklist_Item_Update_Success_Message"), false);
            }
            else{
                helper.showToast($A.get("$Label.c.Checklist_Item_Update_Error_Message"), true);
            }
            
            var modal = component.find("confirm");
            $A.util.addClass(modal, "slds-hide");
        });
        
        component.set("v.ShowSpinner", true);
        $A.enqueueAction(updateItem);
    },
    
    deleteItem : function(component, event, helper) {
        var deleteAction = component.get("c.deleteChecklistItem");
        deleteAction.setParams({"recordId" : component.get("v.ChecklistItem").Id});
        deleteAction.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
                helper.showToast($A.get("$Label.c.Checklist_Item_Delete_Success_Message"), false);
            }
            else{
                helper.showToast($A.get("$Label.c.Checklist_Item_Delete_Error_Message"), true);
            }
            var modal = component.find("confirm");
            $A.util.addClass(modal, "slds-hide");
            component.set("v.ShowSpinner", false);
            var refreshEvent = component.getEvent("RefreshEvent");
            refreshEvent.fire();
        });
        
        component.set("v.ShowSpinner", true);
        $A.enqueueAction(deleteAction);
    },
    
    showToast : function(message, error){
        var toast = $A.get("e.force:showToast");
        console.log("toast : "+ toast);
        if (toast){
            console.log("toast : "+ toast);
            //fire the toast event in Salesforce app and Lightning Experience
            toast.setParams({
                "title": error ? "Error!" : "Success!",
                "message": message,
                "type": error ? "error" : "success"
            });
            
            toast.fire();
        }
    }
})
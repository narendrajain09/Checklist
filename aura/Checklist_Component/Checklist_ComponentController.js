({
    doInit: function(component, event, helper) {
        component.set("v.ShowSpinner", true);
        helper.fetchChecklistInfo(component, event, helper);
    },
    
    controlSpinner : function(component, event, helper) {
        var showSpinner = component.get("v.ShowSpinner");
        if(showSpinner){
            helper.showSpinner(component, event, helper);
        }else{
            helper.hideSpinner(component, event, helper);
        }
    },
    
    newItem : function(component, event, helper) {
        // Prepare a new Checklist Item from template
        component.find("itemRecordCreator").getNewRecord(
            "Checklist_Item__c", // sObject type (objectApiName)
            null,      // recordTypeId
            false,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newItem");
                var error = component.get("v.ErrorMessage");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
                
                var newItemModal = component.find("add-item-modal");
                $A.util.removeClass(newItemModal, "slds-hide");
            })
        );
    },
    
    cancel : function(component, event, helper) {
        var newItemModal = component.find("add-item-modal");
        $A.util.addClass(newItemModal, "slds-hide");
    },
    
    createItem : function(component, event, helper) {
        if(component.get("v.newItemFields.Description__c") !=null){
            component.set("v.newItemFields.Checklist__c", component.get("v.Checklist").Id);
            var auraId = "itemRecordCreator";
            helper.createRecord(component, event, helper, auraId);
            var newItemModal = component.find("add-item-modal");
            $A.util.addClass(newItemModal, "slds-hide");
        }
        else
        {
            component.set("v.hasRequiredError", "True");  
        }
    },
    cancel : function(component, event, helper) {
        var modal = component.find("confirm");
        $A.util.addClass(modal, "slds-hide");
    },
    
    delete : function(component, event, helper) {
    component.set("v.ConfirmMessage", $A.get("$Label.c.Checklist_Item_Delete_Confirm_Message"));
    var modal = component.find("confirm");
    $A.util.removeClass(modal, "slds-hide");
},
 confirm : function(component, event, helper) {
    helper.deleteItem(component, event, helper);
    
},
    
    editChecklist : function(component, event, helper) {
       console.log(component.get("V.Checklist.Id"));
      component.set("v.hasChecklist", false);
        
    }
})
({
	
    markComplete : function(component, event, helper) {
        var action = {};
        action.Name = 'Update';
        action.Value = true;
        component.set("v.Action", action);
        component.set("v.ConfirmMessage", $A.get("$Label.c.Checklist_Item_Confirm_Alert_Message_for_Complete_Status"));
        var modal = component.find("confirm");
        $A.util.removeClass(modal, "slds-hide");
	},
    
    revert : function(component, event, helper) {
        var action = {};
        action.Name = 'Update';
        action.Value = false;
        component.set("v.Action", action);
        component.set("v.ConfirmMessage", $A.get("$Label.c.Checklist_Item_Confirm_Alert_Message_for_Incomplete_Status"));
        
        var modal = component.find("confirm");
        $A.util.removeClass(modal, "slds-hide");
	},
    
    confirm : function(component, event, helper) {
        var action = component.get("v.Action");
        if(action.Name == 'Update'){
         	helper.updateItem(component, event, helper, action.Value);   
        }
        else if(action.Name == 'Delete'){
            helper.deleteItem(component, event, helper);
        }
    },
    
    cancel : function(component, event, helper) {
        var modal = component.find("confirm");
        $A.util.addClass(modal, "slds-hide");
    },
    
    delete : function(component, event, helper) {
        var action = {};
        action.Name = 'Delete';
        action.Value = true;
        component.set("v.Action", action);
        component.set("v.ConfirmMessage", $A.get("$Label.c.Checklist_Item_Delete_Confirm_Message"));
        
        var modal = component.find("confirm");
        $A.util.removeClass(modal, "slds-hide");
    }
 
})
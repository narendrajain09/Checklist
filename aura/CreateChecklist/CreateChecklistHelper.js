({
	fetchPickListVal: function(component, fieldName) {
        var action = component.get("c.getselectOptionsfromController");
        action.setParams({
            "objObject": component.get("v.objInfo"),
            "fld": fieldName
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
               component.set("{!v.typeOptions}",response.getReturnValue());
 			}
        });
        $A.enqueueAction(action);
    },
})
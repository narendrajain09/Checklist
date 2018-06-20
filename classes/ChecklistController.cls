/**************************************************************************************************************************************
    Class Name: ChecklistController
    
    Purpose:    1. This is the controller for the Lightning component Checklist_Component
                    
**************************************************************************************************************************************/
public class ChecklistController {

    /*
     Method Name: getCheckListInfo
     Description: This method is used to fetch Checklist records for the loggeed in user and its related Checklist Item records.
     Inputs:   None     
     Returns:  Map<String,Object>
    */
    @AuraEnabled
    public static Map<String, Object> getCheckListInfo(){
        Map<String, Object> result = new Map<String, Object>();
        result.put('hasChecklist', false);
        List<Checklist__c>  checkList = [SELECT Id, Name,Type__c FROM Checklist__c WHERE OwnerID =:Userinfo.getUserId() LIMIT 1];
        if(!checkList.isEmpty()){
            Checklist__c userChecklist = checkList[0];
            result.put('hasChecklist', true);
            result.put('Checklist', userChecklist);
            result.put('ChecklistItems', [SELECT Id, Name, Checklist__c, Completed__c, Description__c FROM Checklist_Item__c WHERE Checklist__c=:userChecklist.Id ORDER BY NAME]);
        }
        return result;
    }
    
    /*
     Method Name: updateChecklistItem
     Description: This method is used to update Checklist Item records.
     Inputs:   Record Id and Boolean to update whether the checklist item  needs to be updated to complete status or uncomplete status
     Returns:  None
    */
    @AuraEnabled
    public static void updateChecklistItem(String recordId, Boolean completed){
        Checklist_Item__c item = new Checklist_Item__c(
            Id = recordId,
            Completed__c = completed
        );
        Database.update(item);
    }
    /*
     Method Name: deleteChecklistItem
     Description: This method is used to delete Checklist Item records
     Inputs:   None    
     Returns:  None
    */
    @AuraEnabled
    public static void deleteChecklistItem(String recordId){
        Database.delete(recordId);
    }
    
}
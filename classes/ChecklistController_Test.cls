/**************************************************************************************************************************************
    Class Name: ChecklistController_Test
    
    Purpose:    1. This is test class for ChecklistController 
                    
**************************************************************************************************************************************/
@isTest
Public class ChecklistController_Test{
     /*
     Method Name: testChecklistController
     Description: This method is used to test ChecklistController methods
    */
     @IsTest 
     public static void testChecklistController() {
     
     // Creating Checklist Record
     Checklist__c objChecklist = new Checklist__c();
     objChecklist.Name = 'Test Checklist';
     objChecklist.Type__c = 'Grocery';
     Database.insert(objChecklist);
     
     //Creating Checklist Item Record
     
     Checklist_Item__c objChecklistItem  = new  Checklist_Item__c();
     objChecklistItem.Description__c = 'Test Checklist Item';
     objChecklistItem.Checklist__c = objChecklist.id;
     objChecklistItem.Completed__c  = false;
     Database.insert(objChecklistItem);  
     
     Test.StartTest();
     ChecklistController.getCheckListInfo();
     ChecklistController.updateChecklistItem(objChecklistItem.id,true);
     ChecklistController.deleteChecklistItem(objChecklistItem.id);
     Test.StopTest();
     System.assertNotEquals(null,objChecklist);
     }
}
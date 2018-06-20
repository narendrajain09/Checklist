/**************************************************************************************************************************************
    Class Name: CreateChecklistController_Test
    
    Purpose:    1. This is test class for CreateChecklistController
                    
**************************************************************************************************************************************/
@isTest
Public class CreateChecklistController_Test {
      /*
     Method Name: testCreateChecklistController
     Description: This method is used to test CreateChecklistController methods
    */
     @IsTest 
     public static void testCreateChecklistController() {
     List<String> picklistValues = new List<String>();
     //Global Describe Map.
     Map<String, Schema.SObjectType> globalDescMap=Schema.getGlobalDescribe();
      Schema.SObjectType targetType = globalDescMap.get('Checklist__c');
      //Create new sObject.
      sObject sObj=targetType.newSObject();
     String fieldName = 'Type__c';
     Test.StartTest();
     picklistValues  = CreateChecklistController.getselectOptionsfromController(sObj,fieldName);
     Test.StopTest();
     System.assertNotEquals(null,picklistValues);
     }
}
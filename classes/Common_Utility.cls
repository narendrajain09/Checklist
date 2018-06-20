/**************************************************************************************************************************************
    Class Name: Common_Utility 
    
    Purpose:    1. This is common class use to store generic/resuable methods
                    
**************************************************************************************************************************************/
public class Common_Utility {
 /*
     Method Name: getselectOptions
     Description: This method is fetch picklist values for the given object and field
     Inputs:   Sobject Name, Field API name 
     Returns:  List of picklist values
    */
 @AuraEnabled
 public static List < String > getselectOptions(sObject objObject, string fld) {
 List < String > allOpts = new list < String > ();
  Schema.sObjectType objType = objObject.getSObjectType();
 
  Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
  map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
  list < Schema.PicklistEntry > values =
   fieldMap.get(fld).getDescribe().getPickListValues();
 
  for (Schema.PicklistEntry picklistValue: values) {
   allOpts.add(picklistValue.getValue());
  }
  return allOpts;
 }
}
/**************************************************************************************************************************************
    Class Name: CreateChecklistController
    
    Purpose:    1. This is the controller for the Lightning component CreateChecklist
                    
**************************************************************************************************************************************/
public class CreateChecklistController {
    /*
     Method Name: getselectOptionsfromController
     Description: This method is fetch picklist values for the given object and field.
     Inputs:   Sobject Name,Field API name
     Returns: list of picklist values
    */
    @AuraEnabled
    public static List <String> getselectOptionsfromController(sObject objObject, string fld){
     List < String > lstPickList =  new List < String >();
    lstPickList  = Common_Utility.getselectOptions(objObject,fld);
    return lstPickList;
    }
}
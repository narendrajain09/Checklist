<?xml version="1.0" encoding="UTF-8"?>
<Workflow xmlns="http://soap.sforce.com/2006/04/metadata">
    <fieldUpdates>
        <fullName>Update_Owner_Id_Field</fullName>
        <field>Owner_Id__c</field>
        <formula>OwnerId</formula>
        <name>Update Owner Id Field</name>
        <notifyAssignee>false</notifyAssignee>
        <operation>Formula</operation>
        <protected>false</protected>
    </fieldUpdates>
    <rules>
        <fullName>Owner Id Update</fullName>
        <actions>
            <name>Update_Owner_Id_Field</name>
            <type>FieldUpdate</type>
        </actions>
        <active>true</active>
        <formula>Owner_Id__c !=  OwnerId</formula>
        <triggerType>onCreateOrTriggeringUpdate</triggerType>
    </rules>
</Workflow>

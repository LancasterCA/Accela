/*------------------------------------------------------------------------------------------------------/
| SVN $Id: InspectionScheduleBefore.js 6515 2012-03-16 18:15:38Z john.schomp $
| Program : InspectionScheduleBeforeV2.0.js
| Event   : InspectionScheduleBefore
|
| Usage   : Master Script by Accela.  See accompanying documentation and release notes.
|
| Client  : N/A
| Action# : N/A
|
| Notes   :
|
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| START User Configurable Parameters
|
|     Only variables in the following section may be changed.  If any other section is modified, this
|     will no longer be considered a "Master" script and will not be supported in future releases.  If
|     changes are made, please add notes above.
/------------------------------------------------------------------------------------------------------*/

var controlString = "InspectionScheduleBefore"; // Standard choice for control
var preExecute = "PreExecuteForBeforeEvents"
var documentOnly = false;                                                                                  // Document Only -- displays hierarchy of std choice steps

/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var SCRIPT_VERSION = 2.0

eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS"));
eval(getScriptText("INCLUDES_ACCELA_GLOBALS"));
eval(getScriptText("INCLUDES_CUSTOM"));

if (documentOnly) {
              doStandardChoiceActions(controlString,false,0);
              aa.env.setValue("ScriptReturnCode", "0");
              aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");
              aa.abortScript();
              }
              
function getScriptText(vScriptName){
              vScriptName = vScriptName.toUpperCase();
              var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
              var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(),vScriptName,"ADMIN");
              return emseScript.getScriptText() + "";   
}

/*------------------------------------------------------------------------------------------------------/
| BEGIN Event Specific Variables
/------------------------------------------------------------------------------------------------------*/

var InspectionDate = aa.env.getValue("InspectionDate");
var InspectionMode = aa.env.getValue("InspectionMode");
var InspectionTime = aa.env.getValue("InspectionTime");
var InspectionTypeList = aa.env.getValue("InspectionTypeList")
var inspTypeArr = InspectionTypeList.toString().split("\\|");
var InspectorFirstName = aa.env.getValue("InspectorFirstName");
var InspectorLastName = aa.env.getValue("InspectorLastName");
var InspectorMiddleName = aa.env.getValue("InspectorMiddleName");
var NumberOfInspections = aa.env.getValue("NumberOfInspections");

logDebug("InspectionDate = " + InspectionDate);
logDebug("InspectionMode = " + InspectionMode);
logDebug("InspectionTime = " + InspectionTime);
logDebug("NumberOfInspections = " + NumberOfInspections);
logDebug("InspectionTypeList = " + InspectionTypeList);
logDebug("InspectorLastName = " + InspectorLastName);
logDebug("InspectorFirstName = " + InspectorFirstName);

/*------------------------------------------------------------------------------------------------------/
| END Event Specific Variables
/------------------------------------------------------------------------------------------------------*/

if (preExecute.length) doStandardChoiceActions(preExecute,true,0);        // run Pre-execution code

logGlobals(AInfo);
/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
|
/-----------------------------------------------------------------------------------------------------*/

var inspIdArr

for (inspCount in inspTypeArr)
              {
              var InspectionType = inspTypeArr[inspCount];
              var inspType = InspectionType
              logDebug("InspectionType = " + inspTypeArr[inspCount]);  // Kept for old scripts
              logDebug("inspType = " + InspectionType);
              doStandardChoiceActions(controlString,true,0);
              }

// Check for invoicing of fees
//
if (feeSeqList.length)
              {
              invoiceResult = aa.finance.createInvoice(capId, feeSeqList, paymentPeriodList);
              if (invoiceResult.getSuccess())
                             logMessage("Invoicing assessed fee items is successful.");
              else
                             logMessage("**ERROR: Invoicing the fee items assessed to app # " + appId + " was not successful.  Reason: " +  invoiceResult.getErrorMessage());
              }

/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (debug.indexOf("**ERROR") > 0)
              {
              aa.env.setValue("ScriptReturnCode", "1");
              aa.env.setValue("ScriptReturnMessage", debug);
              }
else
              {
              if (cancel)
                             {
                             aa.env.setValue("ScriptReturnCode", "1");
                             if (showMessage) aa.env.setValue("ScriptReturnMessage", "<font color=red><b>Action Cancelled</b></font><br><br>" + message);
                             if (showDebug) aa.env.setValue("ScriptReturnMessage", "<font color=red><b>Action Cancelled</b></font><br><br>" + debug);
                             }
              else
                             {
                             aa.env.setValue("ScriptReturnCode", "0");
                             if (showMessage) aa.env.setValue("ScriptReturnMessage", message);
                             if (showDebug) aa.env.setValue("ScriptReturnMessage", debug);
                             }
              }

/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/
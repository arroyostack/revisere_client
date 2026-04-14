export type ContractRiskSeverity = 'low' | 'medium' | 'high';

export interface ContractPartyDetails {
  partyName: string;
  partyRole: string;
  jurisdiction?: string;
}

export interface ContractObligationDetails {
  obligatedPartyName: string;
  obligationDescription: string;
  dueDateOrCondition?: string;
}

export interface ContractTerminationTerms {
  noticePeriodInDays?: number;
  terminationConditions: string[];
  hasAutomaticRenewal: boolean;
  automaticRenewalDescription?: string;
}

export interface ContractPaymentTerms {
  paymentAmount?: string;
  paymentCurrency?: string;
  paymentScheduleDescription?: string;
  latePenaltyDescription?: string;
}

export interface ExtractedContractData {
  contractTitle: string;
  contractType: string;
  parties: ContractPartyDetails[];
  effectiveDate?: string;
  expirationDate?: string;
  governingLaw?: string;
  paymentTerms?: ContractPaymentTerms;
  terminationConditions: ContractTerminationTerms;
  keyObligations: ContractObligationDetails[];
  confidentialityClauseExists: boolean;
  nonCompeteClauseExists: boolean;
  intellectualPropertyClauseExists: boolean;
  disputeResolutionMethod?: string;
}

export interface ContractRiskFlag {
  riskTitle: string;
  affectedClauseDescription: string;
  riskSeverity: ContractRiskSeverity;
  plainEnglishExplanation: string;
  recommendedAction: string;
}

export interface ContractRiskAnalysisResult {
  overallRiskLevel: ContractRiskSeverity;
  riskFlags: ContractRiskFlag[];
  totalHighSeverityRisks: number;
  totalMediumSeverityRisks: number;
  totalLowSeverityRisks: number;
  riskAnalysisSummary: string;
}

export interface PartyObligationSummary {
  partyName: string;
  obligationsSummary: string;
}

export interface ImportantDateEntry {
  dateDescription: string;
  dateValue: string;
}

export interface ContractSummaryResult {
  oneSentenceDescription: string;
  whatThisContractDoes: string;
  whoIsInvolved: string;
  mainObligationsForEachParty: PartyObligationSummary[];
  importantDatesAndDeadlines: ImportantDateEntry[];
  whatHappensIfThingsGoWrong: string;
  howToGetOut: string;
  threeThingsToKnowBeforeSigning: string[];
}

export interface ContractAnalysisResponse {
  originalFileName: string;
  extractedData: ExtractedContractData;
  riskAnalysis: ContractRiskAnalysisResult;
  summary: ContractSummaryResult;
}

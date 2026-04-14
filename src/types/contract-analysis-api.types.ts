export type RiskSeverity = 'low' | 'medium' | 'high';
export type ChangeDirection = 'favors_first_party' | 'favors_second_party' | 'neutral' | 'unclear';
export type FavorableVersion = 'first_version' | 'second_version' | 'roughly_equal' | 'depends_on_your_role';
export type ChangeSignificance = 'minor' | 'moderate' | 'significant';

export interface ContractParty {
  partyName: string;
  partyRole: string;
  jurisdiction?: string;
}

export interface ContractObligation {
  obligatedPartyName: string;
  obligationDescription: string;
  dueDateOrCondition?: string;
}

export interface ContractTerminationConditions {
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
  parties: ContractParty[];
  effectiveDate?: string;
  expirationDate?: string;
  governingLaw?: string;
  paymentTerms?: ContractPaymentTerms;
  terminationConditions: ContractTerminationConditions;
  keyObligations: ContractObligation[];
  confidentialityClauseExists: boolean;
  nonCompeteClauseExists: boolean;
  intellectualPropertyClauseExists: boolean;
  disputeResolutionMethod?: string;
}

export interface ContractRiskFlag {
  riskTitle: string;
  affectedClauseDescription: string;
  riskSeverity: RiskSeverity;
  plainEnglishExplanation: string;
  recommendedAction: string;
}

export interface ContractRiskAnalysisResult {
  overallRiskLevel: RiskSeverity;
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

export interface ContractFullAnalysisResponse {
  originalFileName: string;
  extractedData: ExtractedContractData;
  riskAnalysis: ContractRiskAnalysisResult;
  summary: ContractSummaryResult;
}

export interface ContractChangeItem {
  changeTitle: string;
  whatChangedDescription: string;
  changeDirection: ChangeDirection;
  plainEnglishExplanation: string;
  significanceLevel: ChangeSignificance;
}

export interface ContractComparisonResult {
  firstContractTitle: string;
  secondContractTitle: string;
  overallAssessment: string;
  totalChangesDetected: number;
  identifiedChanges: ContractChangeItem[];
  clausesAddedInSecondContract: string[];
  clausesRemovedFromFirstContract: string[];
  whichVersionIsFavorable: FavorableVersion;
  favorabilityExplanation: string;
  recommendationBeforeSigning: string;
}

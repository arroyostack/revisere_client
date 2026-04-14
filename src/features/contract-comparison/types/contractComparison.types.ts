export type ContractChangeDirection =
  | 'favors_first_party'
  | 'favors_second_party'
  | 'neutral'
  | 'unclear';

export type FavorableContractVersion =
  | 'first_version'
  | 'second_version'
  | 'roughly_equal'
  | 'depends_on_your_role';

export type ContractChangeSignificance = 'minor' | 'moderate' | 'significant';

export interface ContractChangeItem {
  changeTitle: string;
  whatChangedDescription: string;
  changeDirection: ContractChangeDirection;
  plainEnglishExplanation: string;
  significanceLevel: ContractChangeSignificance;
}

export interface ContractComparisonResult {
  firstContractTitle: string;
  secondContractTitle: string;
  overallAssessment: string;
  totalChangesDetected: number;
  identifiedChanges: ContractChangeItem[];
  clausesAddedInSecondContract: string[];
  clausesRemovedFromFirstContract: string[];
  whichVersionIsFavorable: FavorableContractVersion;
  favorabilityExplanation: string;
  recommendationBeforeSigning: string;
}

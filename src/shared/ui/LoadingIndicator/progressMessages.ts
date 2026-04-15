/**
 * Rotating progress messages for contract analysis operations
 * Provides engaging but professional feedback during long-running tasks
 */

export const CONTRACT_ANALYSIS_PROGRESS_MESSAGES: readonly string[] = [
  'Reading document structure...',
  'Identifying key clauses...',
  'Extracting contract parties...',
  'Analyzing termination conditions...',
  'Assessing potential risks...',
  'Evaluating confidentiality terms...',
  'Generating plain English summary...',
  'Almost done...',
] as const;

export const CONTRACT_COMPARISON_PROGRESS_MESSAGES: readonly string[] = [
  'Processing original document...',
  'Processing revised document...',
  'Identifying changes between versions...',
  'Comparing key obligations...',
  'Highlighting modifications...',
  'Analyzing impact of changes...',
  'Determining favorable terms...',
  'Almost done...',
] as const;

const MESSAGE_CYCLE_INTERVAL_MS = 2500;

/**
 * Hook-like state management for rotating progress messages
 * Returns current message and advance function
 */
export class RotatingProgressMessage {
  private currentMessageIndex: number = 0;
  private messages: readonly string[];

  constructor(messages: readonly string[]) {
    this.messages = messages;
  }

  public getCurrentMessage(): string {
    return this.messages[this.currentMessageIndex];
  }

  public advanceToNextMessage(): void {
    this.currentMessageIndex =
      (this.currentMessageIndex + 1) % this.messages.length;
  }

  public resetToBeginning(): void {
    this.currentMessageIndex = 0;
  }
}

/**
 * Creates a new rotating progress message manager for analysis operations
 */
export function createContractAnalysisProgressMessageManager(): RotatingProgressMessage {
  return new RotatingProgressMessage(CONTRACT_ANALYSIS_PROGRESS_MESSAGES);
}

/**
 * Creates a new rotating progress message manager for comparison operations
 */
export function createContractComparisonProgressMessageManager(): RotatingProgressMessage {
  return new RotatingProgressMessage(CONTRACT_COMPARISON_PROGRESS_MESSAGES);
}

/**
 * Interval in milliseconds between message rotations
 */
export const PROGRESS_MESSAGE_CYCLE_INTERVAL: number = MESSAGE_CYCLE_INTERVAL_MS;

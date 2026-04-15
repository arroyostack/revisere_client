import { describe, it, expect, beforeEach } from 'vitest';
import {
  RotatingProgressMessage,
  createContractAnalysisProgressMessageManager,
  createContractComparisonProgressMessageManager,
  CONTRACT_ANALYSIS_PROGRESS_MESSAGES,
  CONTRACT_COMPARISON_PROGRESS_MESSAGES,
  PROGRESS_MESSAGE_CYCLE_INTERVAL,
} from '@/shared/ui/LoadingIndicator/progressMessages';

describe('RotatingProgressMessage', () => {
  describe('constructor', () => {
    it('initializes with the provided messages array', () => {
      const testMessages = ['Message 1', 'Message 2', 'Message 3'] as const;
      const rotator = new RotatingProgressMessage(testMessages);

      expect(rotator.getCurrentMessage()).toBe('Message 1');
    });
  });

  describe('getCurrentMessage', () => {
    it('returns the first message initially', () => {
      const testMessages = ['First', 'Second', 'Third'] as const;
      const rotator = new RotatingProgressMessage(testMessages);

      expect(rotator.getCurrentMessage()).toBe('First');
    });
  });

  describe('advanceToNextMessage', () => {
    it('cycles to the next message in the array', () => {
      const testMessages = ['One', 'Two', 'Three'] as const;
      const rotator = new RotatingProgressMessage(testMessages);

      rotator.advanceToNextMessage();
      expect(rotator.getCurrentMessage()).toBe('Two');
    });

    it('wraps around to the first message after the last', () => {
      const testMessages = ['First', 'Second'] as const;
      const rotator = new RotatingProgressMessage(testMessages);

      rotator.advanceToNextMessage();
      rotator.advanceToNextMessage();
      expect(rotator.getCurrentMessage()).toBe('First');
    });

    it('cycles through all messages in order', () => {
      const testMessages = ['A', 'B', 'C'] as const;
      const rotator = new RotatingProgressMessage(testMessages);

      expect(rotator.getCurrentMessage()).toBe('A');
      rotator.advanceToNextMessage();
      expect(rotator.getCurrentMessage()).toBe('B');
      rotator.advanceToNextMessage();
      expect(rotator.getCurrentMessage()).toBe('C');
      rotator.advanceToNextMessage();
      expect(rotator.getCurrentMessage()).toBe('A');
    });
  });

  describe('resetToBeginning', () => {
    it('resets the message index to zero', () => {
      const testMessages = ['Start', 'Middle', 'End'] as const;
      const rotator = new RotatingProgressMessage(testMessages);

      rotator.advanceToNextMessage();
      rotator.advanceToNextMessage();
      expect(rotator.getCurrentMessage()).toBe('End');

      rotator.resetToBeginning();
      expect(rotator.getCurrentMessage()).toBe('Start');
    });
  });
});

describe('createContractAnalysisProgressMessageManager', () => {
  it('creates a rotator with analysis-specific messages', () => {
    const rotator = createContractAnalysisProgressMessageManager();

    expect(rotator.getCurrentMessage()).toBe(CONTRACT_ANALYSIS_PROGRESS_MESSAGES[0]);
  });

  it('contains relevant analysis-related messages', () => {
    const rotator = createContractAnalysisProgressMessageManager();
    const firstMessage = rotator.getCurrentMessage();

    expect(firstMessage).toContain('Reading');
    expect(CONTRACT_ANALYSIS_PROGRESS_MESSAGES.length).toBeGreaterThan(0);
  });

  it('cycles through all analysis messages', () => {
    const rotator = createContractAnalysisProgressMessageManager();

    for (let messageIndex = 0; messageIndex < CONTRACT_ANALYSIS_PROGRESS_MESSAGES.length; messageIndex++) {
      expect(rotator.getCurrentMessage()).toBe(CONTRACT_ANALYSIS_PROGRESS_MESSAGES[messageIndex]);
      rotator.advanceToNextMessage();
    }
  });
});

describe('createContractComparisonProgressMessageManager', () => {
  it('creates a rotator with comparison-specific messages', () => {
    const rotator = createContractComparisonProgressMessageManager();

    expect(rotator.getCurrentMessage()).toBe(CONTRACT_COMPARISON_PROGRESS_MESSAGES[0]);
  });

  it('contains relevant comparison-related messages', () => {
    const rotator = createContractComparisonProgressMessageManager();
    const firstMessage = rotator.getCurrentMessage();

    expect(firstMessage).toContain('Processing');
    expect(CONTRACT_COMPARISON_PROGRESS_MESSAGES.length).toBeGreaterThan(0);
  });

  it('cycles through all comparison messages', () => {
    const rotator = createContractComparisonProgressMessageManager();

    for (let messageIndex = 0; messageIndex < CONTRACT_COMPARISON_PROGRESS_MESSAGES.length; messageIndex++) {
      expect(rotator.getCurrentMessage()).toBe(CONTRACT_COMPARISON_PROGRESS_MESSAGES[messageIndex]);
      rotator.advanceToNextMessage();
    }
  });
});

describe('PROGRESS_MESSAGE_CYCLE_INTERVAL', () => {
  it('is defined as a positive number', () => {
    expect(PROGRESS_MESSAGE_CYCLE_INTERVAL).toBeGreaterThan(0);
  });

  it('is a reasonable interval for user experience (1-5 seconds)', () => {
    expect(PROGRESS_MESSAGE_CYCLE_INTERVAL).toBeGreaterThanOrEqual(1000);
    expect(PROGRESS_MESSAGE_CYCLE_INTERVAL).toBeLessThanOrEqual(5000);
  });
});

describe('message content quality', () => {
  it('analysis messages are contextually appropriate', () => {
    const expectedKeywords = ['Reading', 'Identifying', 'Analyzing', 'Assessing'];

    const hasExpectedKeyword = CONTRACT_ANALYSIS_PROGRESS_MESSAGES.some(message =>
      expectedKeywords.some(keyword => message.includes(keyword))
    );

    expect(hasExpectedKeyword).toBe(true);
  });

  it('comparison messages are contextually appropriate', () => {
    const expectedKeywords = ['Processing', 'Comparing', 'Identifying'];

    const hasExpectedKeyword = CONTRACT_COMPARISON_PROGRESS_MESSAGES.some(message =>
      expectedKeywords.some(keyword => message.includes(keyword))
    );

    expect(hasExpectedKeyword).toBe(true);
  });

  it('all analysis messages end with ellipsis', () => {
    CONTRACT_ANALYSIS_PROGRESS_MESSAGES.forEach(message => {
      expect(message.endsWith('...')).toBe(true);
    });
  });

  it('all comparison messages end with ellipsis', () => {
    CONTRACT_COMPARISON_PROGRESS_MESSAGES.forEach(message => {
      expect(message.endsWith('...')).toBe(true);
    });
  });
});

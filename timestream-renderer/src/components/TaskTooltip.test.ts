import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TaskTooltip from './TaskTooltip.vue';

describe('TaskTooltip.vue', () => {
  const mockTask = {
    id: 'test-task',
    name: 'Test Protocol',
    description: 'Test narrative description.',
    skillId: 'stealth',
    xpPerSec: 15,
    entropyWeight: 2.5,
    currentProgress: 0,
    targetProgress: 100,
    completions: 0,
    maxCompletions: 0,
    unlocked: true,
    rewards: [{ itemId: 'scrap', amount: 1, chance: 1.0 }],
    requiredItemId: 'mercury'
  };

  it('renders the task telemetry data correctly', () => {
    const wrapper = mount(TaskTooltip, {
      props: { task: mockTask }
    });

    expect(wrapper.text()).toContain('Test Protocol');
    expect(wrapper.text()).toContain('Test narrative description.');
    expect(wrapper.text()).toContain('ENTROPY: 2.5/s');
    expect(wrapper.text()).toContain('BASE XP: 15/s');
  });

  it('renders rewards and requirements if present', () => {
    const wrapper = mount(TaskTooltip, {
      props: { task: mockTask }
    });

    expect(wrapper.text()).toContain('[CARGO]');
    expect(wrapper.text()).toContain('REQ: MERCURY');
    expect(wrapper.text()).toContain('YIELD: SCRAP (100%)');
  });
});

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
  };

  it('renders the task telemetry data correctly', () => {
    const wrapper = mount(TaskTooltip, {
      props: { task: mockTask }
    });

    expect(wrapper.text()).toContain('Test Protocol');
    expect(wrapper.text()).toContain('Test narrative description.');
  });

  it('emits a close event when the close button is clicked', async () => {
    const wrapper = mount(TaskTooltip, {
      props: { task: mockTask }
    });

    await wrapper.find('.close-btn').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
  });
});

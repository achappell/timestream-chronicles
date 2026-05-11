import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SkillCard from './SkillCard.vue';

describe('SkillCard.vue', () => {
  const mockSkill = {
    name: 'Scientific Inquiry',
    permanentMastery: 2,
    currentFocus: 1,
    focusXP: 50,
    masteryXP: 20
  };

  it('renders skill information correctly', () => {
    const wrapper = mount(SkillCard, {
      props: { skill: mockSkill }
    });

    expect(wrapper.text()).toContain('Scientific Inquiry');
    expect(wrapper.text()).toContain('MST');
    expect(wrapper.text()).toContain('FCS');
  });

  it('calculates and displays multiplier correctly', () => {
    const wrapper = mount(SkillCard, {
      props: { skill: mockSkill }
    });

    // Multiplier = 1.01^2 * 1.05^1 = 1.0201 * 1.05 = 1.0711... (rounded to 1.07)
    expect(wrapper.find('.multiplier').text()).toBe('× 1.07');
  });
});

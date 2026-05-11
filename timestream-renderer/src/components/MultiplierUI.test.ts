import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createMockSkill } from '../logic/test-utils';
import SkillCard from './SkillCard.vue';

describe('SkillCard Multiplier UI', () => {
  const mockSkill = createMockSkill({
    name: 'Scientific Inquiry',
    permanentMastery: 2, // MST MULT: 1.02x (1.01^2)
    currentFocus: 3,     // FCS MULT: 1.16x (1.05^3)
    focusXP: 45,
    masteryXP: 10,
  });

  it('renders detailed technical readout in the tooltip', () => {
    const wrapper = mount(SkillCard, {
      props: { skill: mockSkill }
    });

    // We look for the base-tooltip component wrapper
    const tooltip = wrapper.find('.multiplier-readout');
    expect(tooltip.exists()).toBe(true);

    // Check Mastery Section (Using compounding math expectations)
    expect(tooltip.text()).toContain('MST LVL: 2');
    expect(tooltip.text()).toContain('MST MULT: 1.02x'); // 1.01^2 = 1.0201
    
    // Check Focus Section
    expect(tooltip.text()).toContain('FCS LVL: 3');
    expect(tooltip.text()).toContain('FCS MULT: 1.16x'); // 1.05^3 = 1.1576...
  });

  it('handles zero values correctly', () => {
    const zeroSkill = createMockSkill({
      permanentMastery: 0,
      currentFocus: 0,
      focusXP: 0,
      masteryXP: 0,
    });

    const wrapper = mount(SkillCard, {
      props: { skill: zeroSkill }
    });

    const tooltip = wrapper.find('.multiplier-readout');
    expect(tooltip.text()).toContain('FCS XP: 0 / 100');
    expect(tooltip.text()).toContain('TOTAL: 1.00x');
  });
});

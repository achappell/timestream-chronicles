import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SkillCard from './SkillCard.vue';

describe('SkillCard Multiplier UI', () => {
  const skillWithBonus = {
    name: 'Temporal Physics',
    permanentMastery: 2, // Lvl 2
    currentFocus: 4,     // Lvl 4
    focusXP: 150         // XP for next level (Lvl 4 -> 5 needs (4+1)*100 = 500)
  };

  it('calculates the combined multiplier correctly (1.2 * 1.2 = 1.44)', () => {
    const wrapper = mount(SkillCard, {
      props: {
        skill: skillWithBonus
      }
    });
    
    expect(wrapper.find('.multiplier').text()).toBe('× 1.44');
  });

  it('renders detailed technical readout in the tooltip', () => {
    const wrapper = mount(SkillCard, {
      props: {
        skill: skillWithBonus
      }
    });
    
    const tooltip = wrapper.find('.multiplier-tooltip');
    
    // Check Mastery Section
    expect(tooltip.text()).toContain('MST LVL: +2');
    expect(tooltip.text()).toContain('MST MULT: 1.20');
    
    // Check Focus Section
    expect(tooltip.text()).toContain('FCS LVL: +4');
    expect(tooltip.text()).toContain('FCS XP: 150 / 500');
    expect(tooltip.text()).toContain('FCS MULT: 1.20');
    
    // Check Total
    expect(tooltip.find('.total').text()).toContain('TOTAL: 1.44x');
  });

  it('handles zero values correctly', () => {
    const freshSkill = {
      name: 'Basic Survival',
      permanentMastery: 0,
      currentFocus: 0,
      focusXP: 0
    };
    
    const wrapper = mount(SkillCard, {
      props: {
        skill: freshSkill
      }
    });
    
    const tooltip = wrapper.find('.multiplier-tooltip');
    expect(tooltip.text()).toContain('FCS XP: 0 / 100');
    expect(tooltip.text()).toContain('TOTAL: 1.00x');
  });
});

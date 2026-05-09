import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SkillCard from './SkillCard.vue';

describe('SkillCard.vue', () => {
  const defaultSkill = {
    name: 'Scientific Inquiry',
    permanentMastery: 2,
    currentFocus: 1,
    focusXP: 150
  };

  it('renders skill name correctly', () => {
    const wrapper = mount(SkillCard, {
      props: {
        skill: defaultSkill
      }
    });
    
    expect(wrapper.find('.skill-name').text()).toBe('Scientific Inquiry');
  });

  it('calculates and displays multiplier correctly', () => {
    const wrapper = mount(SkillCard, {
      props: {
        skill: defaultSkill
      }
    });
    
    // Multiplier = 1 + (2 * 0.1) = 1.2
    expect(wrapper.find('.multiplier').text()).toBe('× 1.20');
  });

  it('passes progress to ProgressBar components correctly', () => {
    const wrapper = mount(SkillCard, {
      props: {
        skill: defaultSkill
      }
    });
    
    const progressBars = wrapper.findAllComponents({ name: 'ProgressBar' });
    expect(progressBars.length).toBe(2);
    
    // MST bar: 2 * 5 = 10
    expect(progressBars[0].props('progress')).toBe(10);
    expect(progressBars[0].props('label')).toBe('MST');
    
    // FCS bar: xpNeeded for level 1 is (1 + 1) * 100 = 200. progress is (150 / 200) * 100 = 75
    expect(progressBars[1].props('progress')).toBe(75);
    expect(progressBars[1].props('label')).toBe('FCS');
  });
});

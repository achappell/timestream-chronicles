import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';
import SkillCard from './components/SkillCard.vue';
import GameHeader from './components/GameHeader.vue';

describe('Responsive Layout Verification', () => {
  it('SkillCard should support fluid widths', () => {
    const skill = {
      name: 'Test Skill',
      permanentMastery: 0,
      currentFocus: 0,
      focusXP: 0,
      masteryXP: 0
    };
    
    const wrapper = mount(SkillCard, {
      props: { skill }
    });
    
    expect(wrapper.classes()).toContain('skill-card');
  });

  it('GameHeader should have structural grouping for stats and controls', () => {
    const wrapper = mount(GameHeader, {
      props: {
        stability: 100,
        isPaused: false,
        timeInLoop: 0,
        entropyRate: 0.5
      }
    });
    
    // Verify structural grouping exists for mobile stacking
    expect(wrapper.find('.stats-group').exists()).toBe(true);
    expect(wrapper.find('.controls-group').exists()).toBe(true);
  });

  it('App main containers should be mobile-ready', () => {
    const wrapper = mount(App);
    
    expect(wrapper.find('.console-grid').exists()).toBe(true);
    expect(wrapper.find('.task-list').exists()).toBe(true);
    expect(wrapper.find('.skills-grid').exists()).toBe(true);
  });
});

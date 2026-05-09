import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameHeader from './GameHeader.vue';

describe('GameHeader.vue', () => {
  const defaultProps = {
    stability: 85.5,
    isPaused: false,
    timeInLoop: 125, // 2 mins 5 secs
    entropyRate: 1.2
  };

  it('renders correctly with default props', () => {
    const wrapper = mount(GameHeader, {
      props: defaultProps
    });
    
    expect(wrapper.text()).toContain('TIMELINE');
    expect(wrapper.text()).toContain('02:05');
    
    expect(wrapper.text()).toContain('STABILITY');
    expect(wrapper.text()).toContain('85.5%');
    
    expect(wrapper.text()).toContain('ENTROPY RATE');
    expect(wrapper.text()).toContain('1.20%/s');
  });

  it('displays STASIS text when not paused', () => {
    const wrapper = mount(GameHeader, {
      props: defaultProps
    });
    
    const buttons = wrapper.findAll('.stasis-btn');
    expect(buttons[0].text()).toBe('STASIS');
  });

  it('displays RESUME FLOW text when paused', () => {
    const wrapper = mount(GameHeader, {
      props: {
        ...defaultProps,
        isPaused: true
      }
    });
    
    const buttons = wrapper.findAll('.stasis-btn');
    expect(buttons[0].text()).toBe('RESUME FLOW');
    expect(buttons[0].classes()).toContain('active');
  });

  it('emits pause-toggle when stasis button is clicked', async () => {
    const wrapper = mount(GameHeader, {
      props: defaultProps
    });
    
    const buttons = wrapper.findAll('.stasis-btn');
    await buttons[0].trigger('click');
    
    expect(wrapper.emitted('pause-toggle')).toBeTruthy();
    expect(wrapper.emitted('pause-toggle')!.length).toBe(1);
  });

  it('emits menu-toggle when system button is clicked', async () => {
    const wrapper = mount(GameHeader, {
      props: defaultProps
    });
    
    const buttons = wrapper.findAll('.stasis-btn');
    await buttons[1].trigger('click');
    
    expect(wrapper.emitted('menu-toggle')).toBeTruthy();
    expect(wrapper.emitted('menu-toggle')!.length).toBe(1);
  });
});

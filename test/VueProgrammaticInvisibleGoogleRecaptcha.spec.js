import { shallowMount } from '@vue/test-utils'
import VueProgrammaticInvisibleGoogleRecaptcha from '@/vue-programmatic-invisible-google-recaptcha.vue'

describe('VueProgrammaticInvisibleGoogleRecaptcha.vue', () => {
    it('Sets props correctly', async () => {
        let initialPropsData = {
            sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // test key
            elementId: 'my-test-widget',
            showBadgeMobile: true,
            showBadgeDesktop: true,
            badgePosition: 'left'
        }

        const wrapper = shallowMount(VueProgrammaticInvisibleGoogleRecaptcha, {
            propsData: {
                sitekey: initialPropsData.sitekey,
                elementId: initialPropsData.elementId,
                showBadgeMobile: initialPropsData.showBadgeMobile,
                showBadgeDesktop: initialPropsData.showBadgeDesktop,
                badgePosition: initialPropsData.badgePosition
            }
        })

        expect(wrapper.vm.sitekey).toBe(initialPropsData.sitekey)
        expect(wrapper.vm.elementId).toBe(initialPropsData.elementId)
        expect(wrapper.vm.showBadgeMobile).toBe(initialPropsData.showBadgeMobile)
        expect(wrapper.vm.showBadgeDesktop).toBe(initialPropsData.showBadgeDesktop)
        expect(wrapper.vm.badgePosition).toBe(initialPropsData.badgePosition)
    })

    it('External reCAPTCHA script interval check works correctly', async () => {
        let initialPropsData = {
            sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI', // test key
            elementId: 'my-test-widget',
            showBadgeMobile: true,
            showBadgeDesktop: true,
            badgePosition: 'left'
        }

        const wrapper = shallowMount(VueProgrammaticInvisibleGoogleRecaptcha, {
            propsData: {
                sitekey: initialPropsData.sitekey,
                elementId: initialPropsData.elementId,
                showBadgeMobile: initialPropsData.showBadgeMobile,
                showBadgeDesktop: initialPropsData.showBadgeDesktop,
                badgePosition: initialPropsData.badgePosition
            }
        })

        expect(wrapper.vm.sitekey).toBe(initialPropsData.sitekey)
        expect(wrapper.vm.elementId).toBe(initialPropsData.elementId)
        expect(wrapper.vm.showBadgeMobile).toBe(initialPropsData.showBadgeMobile)
        expect(wrapper.vm.showBadgeDesktop).toBe(initialPropsData.showBadgeDesktop)
        expect(wrapper.vm.badgePosition).toBe(initialPropsData.badgePosition)

        // Ok so here we're going to test the reCAPTCHA loading feature of the
        // library. When you load the component, it should attempt to grab the loaded
        // reCAPTCHA library .js from Google. If it fails the first time, it keeps trying.
        // This is tracked in the checkIntervalRunCount variable. So, because we're not actually loading
        // the code from Google in the tests, after 2 seconds the checkIntervalRunCount should be at least greater than
        // 0, that'll mean its check is working correctly.
        await new Promise(resolve => {
            setTimeout(() => {
                console.log(wrapper.vm.checkIntervalRunCount)
                expect(wrapper.vm.checkIntervalRunCount).toBeGreaterThan(0)
                resolve()
            }, 2000)
        })
    })
})
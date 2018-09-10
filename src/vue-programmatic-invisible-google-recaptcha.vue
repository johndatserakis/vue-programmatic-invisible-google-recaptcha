<template>
    <div
        :id="elementId"
        class="g-recaptcha"
        :class="styleClassObject"
        :data-sitekey="sitekey"
    ></div>
</template>

<script>
export default {
    name: 'vue-programmatic-invisible-google-recaptcha',
    props: {
        sitekey: {
            type: String,
            required: true
        },
        elementId: {
            type: String,
            required: true
        },
        showBadgeMobile: {
            type: Boolean,
            default: true
        },
        showBadgeDesktop: {
            type: Boolean,
            default: true
        },
        badgePosition: {
            type: String
        }
    },
    data () {
        return {
            gAssignedId: null,
            captchaReady: false,
            checkInterval: null,
            checkIntervalRunCount: 0
        }
    },
    computed: {
        styleClassObject: function () {
            return {
                'g-recaptcha--left': (this.badgePosition === 'left'),
                'g-recaptcha--mobile-hidden': (!this.showBadgeMobile),
                'g-recaptcha--desktop-hidden': (!this.showBadgeDesktop)
            }
        }
    },
    methods: {
        execute () {
            window.grecaptcha.execute(this.gAssignedId)
        },
        reset () {
            window.grecaptcha.reset(this.gAssignedId)
        },
        callback (recaptchaToken) {
            // Emit an event called recaptchaCallback with the recaptchaToken as payload
            this.$emit('recaptchaCallback', recaptchaToken)

            // Reset the recaptcha widget so you can execute it again
            this.reset()
        },
        render () {
            this.gAssignedId = window.grecaptcha.render(this.elementId, {
                sitekey: this.sitekey,
                size: 'invisible',
                // the callback executed when the user solve the recaptcha
                'callback': (recaptchaToken) => {
                    this.callback(recaptchaToken)
                },
                'expired-callback': () => {
                    this.reset()
                }
            })
        },
        init() {
            // render the recaptcha widget when the component is mounted
            // we'll watch the captchaReady value in order to
            this.checkInterval = setInterval(() => {
                this.checkIntervalRunCount++
                if (window.grecaptcha && window.grecaptcha.hasOwnProperty('render')){
                    this.captchaReady = true
                }
            }, 1000)
        }
    },
    watch: {
        captchaReady: function(data) {
            if (data) {
                clearInterval(this.checkInterval)
                this.render()
            }
        }
    },
    mounted () {
        // Initialize the recaptcha
        this.init()
    }
}
</script>

<style lang="scss">
    // Can't set the scoped tag here because there are elements
    // that are loaded from Google. :(

    // Need to set some basic styles on the
    // .grecaptcha-badge class
    .grecaptcha-badge {
        z-index: 1000;
    }

    // For left styled .grecaptcha-badge
    .g-recaptcha--left {
        .grecaptcha-badge {
            width: 70px !important;
            overflow: hidden;
            transition: all 0.2s ease !important;
            left: 0px;
        }

        .grecaptcha-badge:hover {
            width: 256px !important;
        }
    }

    // For hidden mobile option
    .g-recaptcha--mobile-hidden {
        .grecaptcha-badge {
            @media (max-width: 992px) {
                display: none;
            }
        }
    }

    // For hidden desktop option
    .g-recaptcha--desktop-hidden {
        .grecaptcha-badge {
            @media (min-width: 992px) {
                display: none;
            }
        }
    }
</style>
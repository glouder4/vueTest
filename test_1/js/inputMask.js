/*
https://github.com/the-darc/string-mask
https://text-mask.github.io/text-mask/
https://creditas.github.io/vanilla-masker/
https://igorescobar.github.io/jQuery-Mask-Plugin/
https://github.com/probil/v-mask
https://github.com/niksmr/vue-masked-input
https://github.com/moip/awesome-mask
https://github.com/kevinongko/vue-numeric
http://flaviosilveira.com/Jquery-Price-Format/ (piscando e pula para o fim)
https://plentz.github.io/jquery-maskmoney/ (melhor que o acima)
*/
console.clear()
var tokens = {
	'#': {pattern: /\d/},
  'S': {pattern: /[a-zA-Z]/},
  'A': {pattern: /[0-9a-zA-Z]/},
  'U': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase()},
  'L': {pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase()}
}
function applyMask (value, mask, masked = true) {
  value = value || ""
  var iMask = 0
  var iValue = 0
  var output = ''
  while (iMask < mask.length && iValue < value.length) {
    cMask = mask[iMask]
    masker = tokens[cMask]
    cValue = value[iValue]
    if (masker) {
      if (masker.pattern.test(cValue)) {
      	output += masker.transform ? masker.transform(cValue) : cValue
        iMask++
      }
      iValue++
    } else {
      if (masked) output += cMask
      if (cValue === cMask) iValue++
      iMask++
    }
  }
  return output
}

Vue.directive('mask', {
	bind (el, binding) {
    var value = el.value
    Object.defineProperty(el, 'value', {
        get: function(){
            return value;
        },
        set: function(newValue){
          console.log(newValue)
            el.setAttribute('value', newValue)
        },
        configurable: true
    });
  }
})

Vue.component('input-mask', {
  template: `<input v-model="maskedValue" :maxlength="mask.length" :placeholder="mask">`,
  props: {
    'value': String,
    'mask': String,
    'masked': {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    currentValue: '',
    currentMask: '',
  }),

  computed: {
    maskedValue: {
    	get () {
        // fix removing mask character at the end.
        // Pressing backspace after 1.2.3 result in 1.2. instead of 1.2
        return this.value === this.currentValue ? this.currentMask
                                                : (this.currentMask = applyMask(this.value, this.mask, true))
      },

      set (newValue) {
        var currentPosition = this.$el.selectionEnd
        var lastMask = this.currentMask
        // update the input before restoring the cursor position
        this.$el.value = this.currentMask = applyMask(newValue, this.mask)

        if (this.currentMask.length <= lastMask.length) { // BACKSPACE
          // when chars are removed, the cursor position is already right
          this.$el.setSelectionRange(currentPosition, currentPosition)
        } else { // inserting characters
          // if the substring till the cursor position is the same, don't change position
          if (newValue.substring(0, currentPosition) == this.currentMask.substring(0, currentPosition)) {
            this.$el.setSelectionRange(currentPosition, currentPosition)
          } else { // increment 1 fixed position, but will not work if the mask has 2+ placeholders, like: ##//##
            this.$el.setSelectionRange(currentPosition+1, currentPosition+1)
          }
        }
        this.currentValue = applyMask(newValue, this.mask, this.masked)
        this.$emit('input', this.currentValue)
      }
    }
  }
})
var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function (x) {
  if (typeof require !== "undefined") return require.apply(this, arguments)
  throw Error('Dynamic require of "' + x + '" is not supported')
})
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports
}
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable })
  }
  return to
}
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
))

// ../../node_modules/bn.js/lib/bn.js
var require_bn = __commonJS({
  "../../node_modules/bn.js/lib/bn.js"(exports, module) {
    (function (module2, exports2) {
      "use strict"
      function assert(val, msg) {
        if (!val) throw new Error(msg || "Assertion failed")
      }
      function inherits(ctor, superCtor) {
        ctor.super_ = superCtor
        var TempCtor = function () {
        }
        TempCtor.prototype = superCtor.prototype
        ctor.prototype = new TempCtor()
        ctor.prototype.constructor = ctor
      }
      function BN2(number, base, endian) {
        if (BN2.isBN(number)) {
          return number
        }
        this.negative = 0
        this.words = null
        this.length = 0
        this.red = null
        if (number !== null) {
          if (base === "le" || base === "be") {
            endian = base
            base = 10
          }
          this._init(number || 0, base || 10, endian || "be")
        }
      }
      if (typeof module2 === "object") {
        module2.exports = BN2
      } else {
        exports2.BN = BN2
      }
      BN2.BN = BN2
      BN2.wordSize = 26
      var Buffer2
      try {
        if (typeof window !== "undefined" && typeof window.Buffer !== "undefined") {
          Buffer2 = window.Buffer
        } else {
          Buffer2 = __require("buffer").Buffer
        }
      } catch (e) {
      }
      BN2.isBN = function isBN(num) {
        if (num instanceof BN2) {
          return true
        }
        return num !== null && typeof num === "object" && num.constructor.wordSize === BN2.wordSize && Array.isArray(num.words)
      }
      BN2.max = function max(left, right) {
        if (left.cmp(right) > 0) return left
        return right
      }
      BN2.min = function min(left, right) {
        if (left.cmp(right) < 0) return left
        return right
      }
      BN2.prototype._init = function init(number, base, endian) {
        if (typeof number === "number") {
          return this._initNumber(number, base, endian)
        }
        if (typeof number === "object") {
          return this._initArray(number, base, endian)
        }
        if (base === "hex") {
          base = 16
        }
        assert(base === (base | 0) && base >= 2 && base <= 36)
        number = number.toString().replace(/\s+/g, "")
        var start = 0
        if (number[0] === "-") {
          start++
          this.negative = 1
        }
        if (start < number.length) {
          if (base === 16) {
            this._parseHex(number, start, endian)
          } else {
            this._parseBase(number, base, start)
            if (endian === "le") {
              this._initArray(this.toArray(), base, endian)
            }
          }
        }
      }
      BN2.prototype._initNumber = function _initNumber(number, base, endian) {
        if (number < 0) {
          this.negative = 1
          number = -number
        }
        if (number < 67108864) {
          this.words = [number & 67108863]
          this.length = 1
        } else if (number < 4503599627370496) {
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863
          ]
          this.length = 2
        } else {
          assert(number < 9007199254740992)
          this.words = [
            number & 67108863,
            number / 67108864 & 67108863,
            1
          ]
          this.length = 3
        }
        if (endian !== "le") return
        this._initArray(this.toArray(), base, endian)
      }
      BN2.prototype._initArray = function _initArray(number, base, endian) {
        assert(typeof number.length === "number")
        if (number.length <= 0) {
          this.words = [0]
          this.length = 1
          return this
        }
        this.length = Math.ceil(number.length / 3)
        this.words = new Array(this.length)
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0
        }
        var j, w
        var off = 0
        if (endian === "be") {
          for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
            w = number[i] | number[i - 1] << 8 | number[i - 2] << 16
            this.words[j] |= w << off & 67108863
            this.words[j + 1] = w >>> 26 - off & 67108863
            off += 24
            if (off >= 26) {
              off -= 26
              j++
            }
          }
        } else if (endian === "le") {
          for (i = 0, j = 0; i < number.length; i += 3) {
            w = number[i] | number[i + 1] << 8 | number[i + 2] << 16
            this.words[j] |= w << off & 67108863
            this.words[j + 1] = w >>> 26 - off & 67108863
            off += 24
            if (off >= 26) {
              off -= 26
              j++
            }
          }
        }
        return this._strip()
      }
      function parseHex4Bits(string, index) {
        var c = string.charCodeAt(index)
        if (c >= 48 && c <= 57) {
          return c - 48
        } else if (c >= 65 && c <= 70) {
          return c - 55
        } else if (c >= 97 && c <= 102) {
          return c - 87
        } else {
          assert(false, "Invalid character in " + string)
        }
      }
      function parseHexByte(string, lowerBound, index) {
        var r = parseHex4Bits(string, index)
        if (index - 1 >= lowerBound) {
          r |= parseHex4Bits(string, index - 1) << 4
        }
        return r
      }
      BN2.prototype._parseHex = function _parseHex(number, start, endian) {
        this.length = Math.ceil((number.length - start) / 6)
        this.words = new Array(this.length)
        for (var i = 0; i < this.length; i++) {
          this.words[i] = 0
        }
        var off = 0
        var j = 0
        var w
        if (endian === "be") {
          for (i = number.length - 1; i >= start; i -= 2) {
            w = parseHexByte(number, start, i) << off
            this.words[j] |= w & 67108863
            if (off >= 18) {
              off -= 18
              j += 1
              this.words[j] |= w >>> 26
            } else {
              off += 8
            }
          }
        } else {
          var parseLength = number.length - start
          for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
            w = parseHexByte(number, start, i) << off
            this.words[j] |= w & 67108863
            if (off >= 18) {
              off -= 18
              j += 1
              this.words[j] |= w >>> 26
            } else {
              off += 8
            }
          }
        }
        this._strip()
      }
      function parseBase(str, start, end, mul) {
        var r = 0
        var b = 0
        var len = Math.min(str.length, end)
        for (var i = start; i < len; i++) {
          var c = str.charCodeAt(i) - 48
          r *= mul
          if (c >= 49) {
            b = c - 49 + 10
          } else if (c >= 17) {
            b = c - 17 + 10
          } else {
            b = c
          }
          assert(c >= 0 && b < mul, "Invalid character")
          r += b
        }
        return r
      }
      BN2.prototype._parseBase = function _parseBase(number, base, start) {
        this.words = [0]
        this.length = 1
        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
          limbLen++
        }
        limbLen--
        limbPow = limbPow / base | 0
        var total = number.length - start
        var mod = total % limbLen
        var end = Math.min(total, total - mod) + start
        var word = 0
        for (var i = start; i < end; i += limbLen) {
          word = parseBase(number, i, i + limbLen, base)
          this.imuln(limbPow)
          if (this.words[0] + word < 67108864) {
            this.words[0] += word
          } else {
            this._iaddn(word)
          }
        }
        if (mod !== 0) {
          var pow = 1
          word = parseBase(number, i, number.length, base)
          for (i = 0; i < mod; i++) {
            pow *= base
          }
          this.imuln(pow)
          if (this.words[0] + word < 67108864) {
            this.words[0] += word
          } else {
            this._iaddn(word)
          }
        }
        this._strip()
      }
      BN2.prototype.copy = function copy(dest) {
        dest.words = new Array(this.length)
        for (var i = 0; i < this.length; i++) {
          dest.words[i] = this.words[i]
        }
        dest.length = this.length
        dest.negative = this.negative
        dest.red = this.red
      }
      function move(dest, src) {
        dest.words = src.words
        dest.length = src.length
        dest.negative = src.negative
        dest.red = src.red
      }
      BN2.prototype._move = function _move(dest) {
        move(dest, this)
      }
      BN2.prototype.clone = function clone() {
        var r = new BN2(null)
        this.copy(r)
        return r
      }
      BN2.prototype._expand = function _expand(size) {
        while (this.length < size) {
          this.words[this.length++] = 0
        }
        return this
      }
      BN2.prototype._strip = function strip() {
        while (this.length > 1 && this.words[this.length - 1] === 0) {
          this.length--
        }
        return this._normSign()
      }
      BN2.prototype._normSign = function _normSign() {
        if (this.length === 1 && this.words[0] === 0) {
          this.negative = 0
        }
        return this
      }
      if (typeof Symbol !== "undefined" && typeof Symbol.for === "function") {
        try {
          BN2.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspect
        } catch (e) {
          BN2.prototype.inspect = inspect
        }
      } else {
        BN2.prototype.inspect = inspect
      }
      function inspect() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
      }
      var zeros = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ]
      var groupSizes = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ]
      var groupBases = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ]
      BN2.prototype.toString = function toString(base, padding) {
        base = base || 10
        padding = padding | 0 || 1
        var out
        if (base === 16 || base === "hex") {
          out = ""
          var off = 0
          var carry = 0
          for (var i = 0; i < this.length; i++) {
            var w = this.words[i]
            var word = ((w << off | carry) & 16777215).toString(16)
            carry = w >>> 24 - off & 16777215
            off += 2
            if (off >= 26) {
              off -= 26
              i--
            }
            if (carry !== 0 || i !== this.length - 1) {
              out = zeros[6 - word.length] + word + out
            } else {
              out = word + out
            }
          }
          if (carry !== 0) {
            out = carry.toString(16) + out
          }
          while (out.length % padding !== 0) {
            out = "0" + out
          }
          if (this.negative !== 0) {
            out = "-" + out
          }
          return out
        }
        if (base === (base | 0) && base >= 2 && base <= 36) {
          var groupSize = groupSizes[base]
          var groupBase = groupBases[base]
          out = ""
          var c = this.clone()
          c.negative = 0
          while (!c.isZero()) {
            var r = c.modrn(groupBase).toString(base)
            c = c.idivn(groupBase)
            if (!c.isZero()) {
              out = zeros[groupSize - r.length] + r + out
            } else {
              out = r + out
            }
          }
          if (this.isZero()) {
            out = "0" + out
          }
          while (out.length % padding !== 0) {
            out = "0" + out
          }
          if (this.negative !== 0) {
            out = "-" + out
          }
          return out
        }
        assert(false, "Base should be between 2 and 36")
      }
      BN2.prototype.toNumber = function toNumber() {
        var ret = this.words[0]
        if (this.length === 2) {
          ret += this.words[1] * 67108864
        } else if (this.length === 3 && this.words[2] === 1) {
          ret += 4503599627370496 + this.words[1] * 67108864
        } else if (this.length > 2) {
          assert(false, "Number can only safely store up to 53 bits")
        }
        return this.negative !== 0 ? -ret : ret
      }
      BN2.prototype.toJSON = function toJSON() {
        return this.toString(16, 2)
      }
      if (Buffer2) {
        BN2.prototype.toBuffer = function toBuffer(endian, length) {
          return this.toArrayLike(Buffer2, endian, length)
        }
      }
      BN2.prototype.toArray = function toArray(endian, length) {
        return this.toArrayLike(Array, endian, length)
      }
      var allocate = function allocate2(ArrayType, size) {
        if (ArrayType.allocUnsafe) {
          return ArrayType.allocUnsafe(size)
        }
        return new ArrayType(size)
      }
      BN2.prototype.toArrayLike = function toArrayLike(ArrayType, endian, length) {
        this._strip()
        var byteLength = this.byteLength()
        var reqLength = length || Math.max(1, byteLength)
        assert(byteLength <= reqLength, "byte array longer than desired length")
        assert(reqLength > 0, "Requested array length <= 0")
        var res = allocate(ArrayType, reqLength)
        var postfix = endian === "le" ? "LE" : "BE"
        this["_toArrayLike" + postfix](res, byteLength)
        return res
      }
      BN2.prototype._toArrayLikeLE = function _toArrayLikeLE(res, byteLength) {
        var position = 0
        var carry = 0
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry
          res[position++] = word & 255
          if (position < res.length) {
            res[position++] = word >> 8 & 255
          }
          if (position < res.length) {
            res[position++] = word >> 16 & 255
          }
          if (shift === 6) {
            if (position < res.length) {
              res[position++] = word >> 24 & 255
            }
            carry = 0
            shift = 0
          } else {
            carry = word >>> 24
            shift += 2
          }
        }
        if (position < res.length) {
          res[position++] = carry
          while (position < res.length) {
            res[position++] = 0
          }
        }
      }
      BN2.prototype._toArrayLikeBE = function _toArrayLikeBE(res, byteLength) {
        var position = res.length - 1
        var carry = 0
        for (var i = 0, shift = 0; i < this.length; i++) {
          var word = this.words[i] << shift | carry
          res[position--] = word & 255
          if (position >= 0) {
            res[position--] = word >> 8 & 255
          }
          if (position >= 0) {
            res[position--] = word >> 16 & 255
          }
          if (shift === 6) {
            if (position >= 0) {
              res[position--] = word >> 24 & 255
            }
            carry = 0
            shift = 0
          } else {
            carry = word >>> 24
            shift += 2
          }
        }
        if (position >= 0) {
          res[position--] = carry
          while (position >= 0) {
            res[position--] = 0
          }
        }
      }
      if (Math.clz32) {
        BN2.prototype._countBits = function _countBits(w) {
          return 32 - Math.clz32(w)
        }
      } else {
        BN2.prototype._countBits = function _countBits(w) {
          var t = w
          var r = 0
          if (t >= 4096) {
            r += 13
            t >>>= 13
          }
          if (t >= 64) {
            r += 7
            t >>>= 7
          }
          if (t >= 8) {
            r += 4
            t >>>= 4
          }
          if (t >= 2) {
            r += 2
            t >>>= 2
          }
          return r + t
        }
      }
      BN2.prototype._zeroBits = function _zeroBits(w) {
        if (w === 0) return 26
        var t = w
        var r = 0
        if ((t & 8191) === 0) {
          r += 13
          t >>>= 13
        }
        if ((t & 127) === 0) {
          r += 7
          t >>>= 7
        }
        if ((t & 15) === 0) {
          r += 4
          t >>>= 4
        }
        if ((t & 3) === 0) {
          r += 2
          t >>>= 2
        }
        if ((t & 1) === 0) {
          r++
        }
        return r
      }
      BN2.prototype.bitLength = function bitLength() {
        var w = this.words[this.length - 1]
        var hi = this._countBits(w)
        return (this.length - 1) * 26 + hi
      }
      function toBitArray(num) {
        var w = new Array(num.bitLength())
        for (var bit = 0; bit < w.length; bit++) {
          var off = bit / 26 | 0
          var wbit = bit % 26
          w[bit] = num.words[off] >>> wbit & 1
        }
        return w
      }
      BN2.prototype.zeroBits = function zeroBits() {
        if (this.isZero()) return 0
        var r = 0
        for (var i = 0; i < this.length; i++) {
          var b = this._zeroBits(this.words[i])
          r += b
          if (b !== 26) break
        }
        return r
      }
      BN2.prototype.byteLength = function byteLength() {
        return Math.ceil(this.bitLength() / 8)
      }
      BN2.prototype.toTwos = function toTwos(width) {
        if (this.negative !== 0) {
          return this.abs().inotn(width).iaddn(1)
        }
        return this.clone()
      }
      BN2.prototype.fromTwos = function fromTwos(width) {
        if (this.testn(width - 1)) {
          return this.notn(width).iaddn(1).ineg()
        }
        return this.clone()
      }
      BN2.prototype.isNeg = function isNeg() {
        return this.negative !== 0
      }
      BN2.prototype.neg = function neg() {
        return this.clone().ineg()
      }
      BN2.prototype.ineg = function ineg() {
        if (!this.isZero()) {
          this.negative ^= 1
        }
        return this
      }
      BN2.prototype.iuor = function iuor(num) {
        while (this.length < num.length) {
          this.words[this.length++] = 0
        }
        for (var i = 0; i < num.length; i++) {
          this.words[i] = this.words[i] | num.words[i]
        }
        return this._strip()
      }
      BN2.prototype.ior = function ior(num) {
        assert((this.negative | num.negative) === 0)
        return this.iuor(num)
      }
      BN2.prototype.or = function or(num) {
        if (this.length > num.length) return this.clone().ior(num)
        return num.clone().ior(this)
      }
      BN2.prototype.uor = function uor(num) {
        if (this.length > num.length) return this.clone().iuor(num)
        return num.clone().iuor(this)
      }
      BN2.prototype.iuand = function iuand(num) {
        var b
        if (this.length > num.length) {
          b = num
        } else {
          b = this
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = this.words[i] & num.words[i]
        }
        this.length = b.length
        return this._strip()
      }
      BN2.prototype.iand = function iand(num) {
        assert((this.negative | num.negative) === 0)
        return this.iuand(num)
      }
      BN2.prototype.and = function and(num) {
        if (this.length > num.length) return this.clone().iand(num)
        return num.clone().iand(this)
      }
      BN2.prototype.uand = function uand(num) {
        if (this.length > num.length) return this.clone().iuand(num)
        return num.clone().iuand(this)
      }
      BN2.prototype.iuxor = function iuxor(num) {
        var a
        var b
        if (this.length > num.length) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }
        for (var i = 0; i < b.length; i++) {
          this.words[i] = a.words[i] ^ b.words[i]
        }
        if (this !== a) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i]
          }
        }
        this.length = a.length
        return this._strip()
      }
      BN2.prototype.ixor = function ixor(num) {
        assert((this.negative | num.negative) === 0)
        return this.iuxor(num)
      }
      BN2.prototype.xor = function xor(num) {
        if (this.length > num.length) return this.clone().ixor(num)
        return num.clone().ixor(this)
      }
      BN2.prototype.uxor = function uxor(num) {
        if (this.length > num.length) return this.clone().iuxor(num)
        return num.clone().iuxor(this)
      }
      BN2.prototype.inotn = function inotn(width) {
        assert(typeof width === "number" && width >= 0)
        var bytesNeeded = Math.ceil(width / 26) | 0
        var bitsLeft = width % 26
        this._expand(bytesNeeded)
        if (bitsLeft > 0) {
          bytesNeeded--
        }
        for (var i = 0; i < bytesNeeded; i++) {
          this.words[i] = ~this.words[i] & 67108863
        }
        if (bitsLeft > 0) {
          this.words[i] = ~this.words[i] & 67108863 >> 26 - bitsLeft
        }
        return this._strip()
      }
      BN2.prototype.notn = function notn(width) {
        return this.clone().inotn(width)
      }
      BN2.prototype.setn = function setn(bit, val) {
        assert(typeof bit === "number" && bit >= 0)
        var off = bit / 26 | 0
        var wbit = bit % 26
        this._expand(off + 1)
        if (val) {
          this.words[off] = this.words[off] | 1 << wbit
        } else {
          this.words[off] = this.words[off] & ~(1 << wbit)
        }
        return this._strip()
      }
      BN2.prototype.iadd = function iadd(num) {
        var r
        if (this.negative !== 0 && num.negative === 0) {
          this.negative = 0
          r = this.isub(num)
          this.negative ^= 1
          return this._normSign()
        } else if (this.negative === 0 && num.negative !== 0) {
          num.negative = 0
          r = this.isub(num)
          num.negative = 1
          return r._normSign()
        }
        var a, b
        if (this.length > num.length) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }
        var carry = 0
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) + (b.words[i] | 0) + carry
          this.words[i] = r & 67108863
          carry = r >>> 26
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry
          this.words[i] = r & 67108863
          carry = r >>> 26
        }
        this.length = a.length
        if (carry !== 0) {
          this.words[this.length] = carry
          this.length++
        } else if (a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i]
          }
        }
        return this
      }
      BN2.prototype.add = function add(num) {
        var res
        if (num.negative !== 0 && this.negative === 0) {
          num.negative = 0
          res = this.sub(num)
          num.negative ^= 1
          return res
        } else if (num.negative === 0 && this.negative !== 0) {
          this.negative = 0
          res = num.sub(this)
          this.negative = 1
          return res
        }
        if (this.length > num.length) return this.clone().iadd(num)
        return num.clone().iadd(this)
      }
      BN2.prototype.isub = function isub(num) {
        if (num.negative !== 0) {
          num.negative = 0
          var r = this.iadd(num)
          num.negative = 1
          return r._normSign()
        } else if (this.negative !== 0) {
          this.negative = 0
          this.iadd(num)
          this.negative = 1
          return this._normSign()
        }
        var cmp = this.cmp(num)
        if (cmp === 0) {
          this.negative = 0
          this.length = 1
          this.words[0] = 0
          return this
        }
        var a, b
        if (cmp > 0) {
          a = this
          b = num
        } else {
          a = num
          b = this
        }
        var carry = 0
        for (var i = 0; i < b.length; i++) {
          r = (a.words[i] | 0) - (b.words[i] | 0) + carry
          carry = r >> 26
          this.words[i] = r & 67108863
        }
        for (; carry !== 0 && i < a.length; i++) {
          r = (a.words[i] | 0) + carry
          carry = r >> 26
          this.words[i] = r & 67108863
        }
        if (carry === 0 && i < a.length && a !== this) {
          for (; i < a.length; i++) {
            this.words[i] = a.words[i]
          }
        }
        this.length = Math.max(this.length, i)
        if (a !== this) {
          this.negative = 1
        }
        return this._strip()
      }
      BN2.prototype.sub = function sub(num) {
        return this.clone().isub(num)
      }
      function smallMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative
        var len = self2.length + num.length | 0
        out.length = len
        len = len - 1 | 0
        var a = self2.words[0] | 0
        var b = num.words[0] | 0
        var r = a * b
        var lo = r & 67108863
        var carry = r / 67108864 | 0
        out.words[0] = lo
        for (var k = 1; k < len; k++) {
          var ncarry = carry >>> 26
          var rword = carry & 67108863
          var maxJ = Math.min(k, num.length - 1)
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j | 0
            a = self2.words[i] | 0
            b = num.words[j] | 0
            r = a * b + rword
            ncarry += r / 67108864 | 0
            rword = r & 67108863
          }
          out.words[k] = rword | 0
          carry = ncarry | 0
        }
        if (carry !== 0) {
          out.words[k] = carry | 0
        } else {
          out.length--
        }
        return out._strip()
      }
      var comb10MulTo = function comb10MulTo2(self2, num, out) {
        var a = self2.words
        var b = num.words
        var o = out.words
        var c = 0
        var lo
        var mid
        var hi
        var a0 = a[0] | 0
        var al0 = a0 & 8191
        var ah0 = a0 >>> 13
        var a1 = a[1] | 0
        var al1 = a1 & 8191
        var ah1 = a1 >>> 13
        var a2 = a[2] | 0
        var al2 = a2 & 8191
        var ah2 = a2 >>> 13
        var a3 = a[3] | 0
        var al3 = a3 & 8191
        var ah3 = a3 >>> 13
        var a4 = a[4] | 0
        var al4 = a4 & 8191
        var ah4 = a4 >>> 13
        var a5 = a[5] | 0
        var al5 = a5 & 8191
        var ah5 = a5 >>> 13
        var a6 = a[6] | 0
        var al6 = a6 & 8191
        var ah6 = a6 >>> 13
        var a7 = a[7] | 0
        var al7 = a7 & 8191
        var ah7 = a7 >>> 13
        var a8 = a[8] | 0
        var al8 = a8 & 8191
        var ah8 = a8 >>> 13
        var a9 = a[9] | 0
        var al9 = a9 & 8191
        var ah9 = a9 >>> 13
        var b0 = b[0] | 0
        var bl0 = b0 & 8191
        var bh0 = b0 >>> 13
        var b1 = b[1] | 0
        var bl1 = b1 & 8191
        var bh1 = b1 >>> 13
        var b2 = b[2] | 0
        var bl2 = b2 & 8191
        var bh2 = b2 >>> 13
        var b3 = b[3] | 0
        var bl3 = b3 & 8191
        var bh3 = b3 >>> 13
        var b4 = b[4] | 0
        var bl4 = b4 & 8191
        var bh4 = b4 >>> 13
        var b5 = b[5] | 0
        var bl5 = b5 & 8191
        var bh5 = b5 >>> 13
        var b6 = b[6] | 0
        var bl6 = b6 & 8191
        var bh6 = b6 >>> 13
        var b7 = b[7] | 0
        var bl7 = b7 & 8191
        var bh7 = b7 >>> 13
        var b8 = b[8] | 0
        var bl8 = b8 & 8191
        var bh8 = b8 >>> 13
        var b9 = b[9] | 0
        var bl9 = b9 & 8191
        var bh9 = b9 >>> 13
        out.negative = self2.negative ^ num.negative
        out.length = 19
        lo = Math.imul(al0, bl0)
        mid = Math.imul(al0, bh0)
        mid = mid + Math.imul(ah0, bl0) | 0
        hi = Math.imul(ah0, bh0)
        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0
        w0 &= 67108863
        lo = Math.imul(al1, bl0)
        mid = Math.imul(al1, bh0)
        mid = mid + Math.imul(ah1, bl0) | 0
        hi = Math.imul(ah1, bh0)
        lo = lo + Math.imul(al0, bl1) | 0
        mid = mid + Math.imul(al0, bh1) | 0
        mid = mid + Math.imul(ah0, bl1) | 0
        hi = hi + Math.imul(ah0, bh1) | 0
        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0
        w1 &= 67108863
        lo = Math.imul(al2, bl0)
        mid = Math.imul(al2, bh0)
        mid = mid + Math.imul(ah2, bl0) | 0
        hi = Math.imul(ah2, bh0)
        lo = lo + Math.imul(al1, bl1) | 0
        mid = mid + Math.imul(al1, bh1) | 0
        mid = mid + Math.imul(ah1, bl1) | 0
        hi = hi + Math.imul(ah1, bh1) | 0
        lo = lo + Math.imul(al0, bl2) | 0
        mid = mid + Math.imul(al0, bh2) | 0
        mid = mid + Math.imul(ah0, bl2) | 0
        hi = hi + Math.imul(ah0, bh2) | 0
        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0
        w2 &= 67108863
        lo = Math.imul(al3, bl0)
        mid = Math.imul(al3, bh0)
        mid = mid + Math.imul(ah3, bl0) | 0
        hi = Math.imul(ah3, bh0)
        lo = lo + Math.imul(al2, bl1) | 0
        mid = mid + Math.imul(al2, bh1) | 0
        mid = mid + Math.imul(ah2, bl1) | 0
        hi = hi + Math.imul(ah2, bh1) | 0
        lo = lo + Math.imul(al1, bl2) | 0
        mid = mid + Math.imul(al1, bh2) | 0
        mid = mid + Math.imul(ah1, bl2) | 0
        hi = hi + Math.imul(ah1, bh2) | 0
        lo = lo + Math.imul(al0, bl3) | 0
        mid = mid + Math.imul(al0, bh3) | 0
        mid = mid + Math.imul(ah0, bl3) | 0
        hi = hi + Math.imul(ah0, bh3) | 0
        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0
        w3 &= 67108863
        lo = Math.imul(al4, bl0)
        mid = Math.imul(al4, bh0)
        mid = mid + Math.imul(ah4, bl0) | 0
        hi = Math.imul(ah4, bh0)
        lo = lo + Math.imul(al3, bl1) | 0
        mid = mid + Math.imul(al3, bh1) | 0
        mid = mid + Math.imul(ah3, bl1) | 0
        hi = hi + Math.imul(ah3, bh1) | 0
        lo = lo + Math.imul(al2, bl2) | 0
        mid = mid + Math.imul(al2, bh2) | 0
        mid = mid + Math.imul(ah2, bl2) | 0
        hi = hi + Math.imul(ah2, bh2) | 0
        lo = lo + Math.imul(al1, bl3) | 0
        mid = mid + Math.imul(al1, bh3) | 0
        mid = mid + Math.imul(ah1, bl3) | 0
        hi = hi + Math.imul(ah1, bh3) | 0
        lo = lo + Math.imul(al0, bl4) | 0
        mid = mid + Math.imul(al0, bh4) | 0
        mid = mid + Math.imul(ah0, bl4) | 0
        hi = hi + Math.imul(ah0, bh4) | 0
        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0
        w4 &= 67108863
        lo = Math.imul(al5, bl0)
        mid = Math.imul(al5, bh0)
        mid = mid + Math.imul(ah5, bl0) | 0
        hi = Math.imul(ah5, bh0)
        lo = lo + Math.imul(al4, bl1) | 0
        mid = mid + Math.imul(al4, bh1) | 0
        mid = mid + Math.imul(ah4, bl1) | 0
        hi = hi + Math.imul(ah4, bh1) | 0
        lo = lo + Math.imul(al3, bl2) | 0
        mid = mid + Math.imul(al3, bh2) | 0
        mid = mid + Math.imul(ah3, bl2) | 0
        hi = hi + Math.imul(ah3, bh2) | 0
        lo = lo + Math.imul(al2, bl3) | 0
        mid = mid + Math.imul(al2, bh3) | 0
        mid = mid + Math.imul(ah2, bl3) | 0
        hi = hi + Math.imul(ah2, bh3) | 0
        lo = lo + Math.imul(al1, bl4) | 0
        mid = mid + Math.imul(al1, bh4) | 0
        mid = mid + Math.imul(ah1, bl4) | 0
        hi = hi + Math.imul(ah1, bh4) | 0
        lo = lo + Math.imul(al0, bl5) | 0
        mid = mid + Math.imul(al0, bh5) | 0
        mid = mid + Math.imul(ah0, bl5) | 0
        hi = hi + Math.imul(ah0, bh5) | 0
        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0
        w5 &= 67108863
        lo = Math.imul(al6, bl0)
        mid = Math.imul(al6, bh0)
        mid = mid + Math.imul(ah6, bl0) | 0
        hi = Math.imul(ah6, bh0)
        lo = lo + Math.imul(al5, bl1) | 0
        mid = mid + Math.imul(al5, bh1) | 0
        mid = mid + Math.imul(ah5, bl1) | 0
        hi = hi + Math.imul(ah5, bh1) | 0
        lo = lo + Math.imul(al4, bl2) | 0
        mid = mid + Math.imul(al4, bh2) | 0
        mid = mid + Math.imul(ah4, bl2) | 0
        hi = hi + Math.imul(ah4, bh2) | 0
        lo = lo + Math.imul(al3, bl3) | 0
        mid = mid + Math.imul(al3, bh3) | 0
        mid = mid + Math.imul(ah3, bl3) | 0
        hi = hi + Math.imul(ah3, bh3) | 0
        lo = lo + Math.imul(al2, bl4) | 0
        mid = mid + Math.imul(al2, bh4) | 0
        mid = mid + Math.imul(ah2, bl4) | 0
        hi = hi + Math.imul(ah2, bh4) | 0
        lo = lo + Math.imul(al1, bl5) | 0
        mid = mid + Math.imul(al1, bh5) | 0
        mid = mid + Math.imul(ah1, bl5) | 0
        hi = hi + Math.imul(ah1, bh5) | 0
        lo = lo + Math.imul(al0, bl6) | 0
        mid = mid + Math.imul(al0, bh6) | 0
        mid = mid + Math.imul(ah0, bl6) | 0
        hi = hi + Math.imul(ah0, bh6) | 0
        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0
        w6 &= 67108863
        lo = Math.imul(al7, bl0)
        mid = Math.imul(al7, bh0)
        mid = mid + Math.imul(ah7, bl0) | 0
        hi = Math.imul(ah7, bh0)
        lo = lo + Math.imul(al6, bl1) | 0
        mid = mid + Math.imul(al6, bh1) | 0
        mid = mid + Math.imul(ah6, bl1) | 0
        hi = hi + Math.imul(ah6, bh1) | 0
        lo = lo + Math.imul(al5, bl2) | 0
        mid = mid + Math.imul(al5, bh2) | 0
        mid = mid + Math.imul(ah5, bl2) | 0
        hi = hi + Math.imul(ah5, bh2) | 0
        lo = lo + Math.imul(al4, bl3) | 0
        mid = mid + Math.imul(al4, bh3) | 0
        mid = mid + Math.imul(ah4, bl3) | 0
        hi = hi + Math.imul(ah4, bh3) | 0
        lo = lo + Math.imul(al3, bl4) | 0
        mid = mid + Math.imul(al3, bh4) | 0
        mid = mid + Math.imul(ah3, bl4) | 0
        hi = hi + Math.imul(ah3, bh4) | 0
        lo = lo + Math.imul(al2, bl5) | 0
        mid = mid + Math.imul(al2, bh5) | 0
        mid = mid + Math.imul(ah2, bl5) | 0
        hi = hi + Math.imul(ah2, bh5) | 0
        lo = lo + Math.imul(al1, bl6) | 0
        mid = mid + Math.imul(al1, bh6) | 0
        mid = mid + Math.imul(ah1, bl6) | 0
        hi = hi + Math.imul(ah1, bh6) | 0
        lo = lo + Math.imul(al0, bl7) | 0
        mid = mid + Math.imul(al0, bh7) | 0
        mid = mid + Math.imul(ah0, bl7) | 0
        hi = hi + Math.imul(ah0, bh7) | 0
        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0
        w7 &= 67108863
        lo = Math.imul(al8, bl0)
        mid = Math.imul(al8, bh0)
        mid = mid + Math.imul(ah8, bl0) | 0
        hi = Math.imul(ah8, bh0)
        lo = lo + Math.imul(al7, bl1) | 0
        mid = mid + Math.imul(al7, bh1) | 0
        mid = mid + Math.imul(ah7, bl1) | 0
        hi = hi + Math.imul(ah7, bh1) | 0
        lo = lo + Math.imul(al6, bl2) | 0
        mid = mid + Math.imul(al6, bh2) | 0
        mid = mid + Math.imul(ah6, bl2) | 0
        hi = hi + Math.imul(ah6, bh2) | 0
        lo = lo + Math.imul(al5, bl3) | 0
        mid = mid + Math.imul(al5, bh3) | 0
        mid = mid + Math.imul(ah5, bl3) | 0
        hi = hi + Math.imul(ah5, bh3) | 0
        lo = lo + Math.imul(al4, bl4) | 0
        mid = mid + Math.imul(al4, bh4) | 0
        mid = mid + Math.imul(ah4, bl4) | 0
        hi = hi + Math.imul(ah4, bh4) | 0
        lo = lo + Math.imul(al3, bl5) | 0
        mid = mid + Math.imul(al3, bh5) | 0
        mid = mid + Math.imul(ah3, bl5) | 0
        hi = hi + Math.imul(ah3, bh5) | 0
        lo = lo + Math.imul(al2, bl6) | 0
        mid = mid + Math.imul(al2, bh6) | 0
        mid = mid + Math.imul(ah2, bl6) | 0
        hi = hi + Math.imul(ah2, bh6) | 0
        lo = lo + Math.imul(al1, bl7) | 0
        mid = mid + Math.imul(al1, bh7) | 0
        mid = mid + Math.imul(ah1, bl7) | 0
        hi = hi + Math.imul(ah1, bh7) | 0
        lo = lo + Math.imul(al0, bl8) | 0
        mid = mid + Math.imul(al0, bh8) | 0
        mid = mid + Math.imul(ah0, bl8) | 0
        hi = hi + Math.imul(ah0, bh8) | 0
        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0
        w8 &= 67108863
        lo = Math.imul(al9, bl0)
        mid = Math.imul(al9, bh0)
        mid = mid + Math.imul(ah9, bl0) | 0
        hi = Math.imul(ah9, bh0)
        lo = lo + Math.imul(al8, bl1) | 0
        mid = mid + Math.imul(al8, bh1) | 0
        mid = mid + Math.imul(ah8, bl1) | 0
        hi = hi + Math.imul(ah8, bh1) | 0
        lo = lo + Math.imul(al7, bl2) | 0
        mid = mid + Math.imul(al7, bh2) | 0
        mid = mid + Math.imul(ah7, bl2) | 0
        hi = hi + Math.imul(ah7, bh2) | 0
        lo = lo + Math.imul(al6, bl3) | 0
        mid = mid + Math.imul(al6, bh3) | 0
        mid = mid + Math.imul(ah6, bl3) | 0
        hi = hi + Math.imul(ah6, bh3) | 0
        lo = lo + Math.imul(al5, bl4) | 0
        mid = mid + Math.imul(al5, bh4) | 0
        mid = mid + Math.imul(ah5, bl4) | 0
        hi = hi + Math.imul(ah5, bh4) | 0
        lo = lo + Math.imul(al4, bl5) | 0
        mid = mid + Math.imul(al4, bh5) | 0
        mid = mid + Math.imul(ah4, bl5) | 0
        hi = hi + Math.imul(ah4, bh5) | 0
        lo = lo + Math.imul(al3, bl6) | 0
        mid = mid + Math.imul(al3, bh6) | 0
        mid = mid + Math.imul(ah3, bl6) | 0
        hi = hi + Math.imul(ah3, bh6) | 0
        lo = lo + Math.imul(al2, bl7) | 0
        mid = mid + Math.imul(al2, bh7) | 0
        mid = mid + Math.imul(ah2, bl7) | 0
        hi = hi + Math.imul(ah2, bh7) | 0
        lo = lo + Math.imul(al1, bl8) | 0
        mid = mid + Math.imul(al1, bh8) | 0
        mid = mid + Math.imul(ah1, bl8) | 0
        hi = hi + Math.imul(ah1, bh8) | 0
        lo = lo + Math.imul(al0, bl9) | 0
        mid = mid + Math.imul(al0, bh9) | 0
        mid = mid + Math.imul(ah0, bl9) | 0
        hi = hi + Math.imul(ah0, bh9) | 0
        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0
        w9 &= 67108863
        lo = Math.imul(al9, bl1)
        mid = Math.imul(al9, bh1)
        mid = mid + Math.imul(ah9, bl1) | 0
        hi = Math.imul(ah9, bh1)
        lo = lo + Math.imul(al8, bl2) | 0
        mid = mid + Math.imul(al8, bh2) | 0
        mid = mid + Math.imul(ah8, bl2) | 0
        hi = hi + Math.imul(ah8, bh2) | 0
        lo = lo + Math.imul(al7, bl3) | 0
        mid = mid + Math.imul(al7, bh3) | 0
        mid = mid + Math.imul(ah7, bl3) | 0
        hi = hi + Math.imul(ah7, bh3) | 0
        lo = lo + Math.imul(al6, bl4) | 0
        mid = mid + Math.imul(al6, bh4) | 0
        mid = mid + Math.imul(ah6, bl4) | 0
        hi = hi + Math.imul(ah6, bh4) | 0
        lo = lo + Math.imul(al5, bl5) | 0
        mid = mid + Math.imul(al5, bh5) | 0
        mid = mid + Math.imul(ah5, bl5) | 0
        hi = hi + Math.imul(ah5, bh5) | 0
        lo = lo + Math.imul(al4, bl6) | 0
        mid = mid + Math.imul(al4, bh6) | 0
        mid = mid + Math.imul(ah4, bl6) | 0
        hi = hi + Math.imul(ah4, bh6) | 0
        lo = lo + Math.imul(al3, bl7) | 0
        mid = mid + Math.imul(al3, bh7) | 0
        mid = mid + Math.imul(ah3, bl7) | 0
        hi = hi + Math.imul(ah3, bh7) | 0
        lo = lo + Math.imul(al2, bl8) | 0
        mid = mid + Math.imul(al2, bh8) | 0
        mid = mid + Math.imul(ah2, bl8) | 0
        hi = hi + Math.imul(ah2, bh8) | 0
        lo = lo + Math.imul(al1, bl9) | 0
        mid = mid + Math.imul(al1, bh9) | 0
        mid = mid + Math.imul(ah1, bl9) | 0
        hi = hi + Math.imul(ah1, bh9) | 0
        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0
        w10 &= 67108863
        lo = Math.imul(al9, bl2)
        mid = Math.imul(al9, bh2)
        mid = mid + Math.imul(ah9, bl2) | 0
        hi = Math.imul(ah9, bh2)
        lo = lo + Math.imul(al8, bl3) | 0
        mid = mid + Math.imul(al8, bh3) | 0
        mid = mid + Math.imul(ah8, bl3) | 0
        hi = hi + Math.imul(ah8, bh3) | 0
        lo = lo + Math.imul(al7, bl4) | 0
        mid = mid + Math.imul(al7, bh4) | 0
        mid = mid + Math.imul(ah7, bl4) | 0
        hi = hi + Math.imul(ah7, bh4) | 0
        lo = lo + Math.imul(al6, bl5) | 0
        mid = mid + Math.imul(al6, bh5) | 0
        mid = mid + Math.imul(ah6, bl5) | 0
        hi = hi + Math.imul(ah6, bh5) | 0
        lo = lo + Math.imul(al5, bl6) | 0
        mid = mid + Math.imul(al5, bh6) | 0
        mid = mid + Math.imul(ah5, bl6) | 0
        hi = hi + Math.imul(ah5, bh6) | 0
        lo = lo + Math.imul(al4, bl7) | 0
        mid = mid + Math.imul(al4, bh7) | 0
        mid = mid + Math.imul(ah4, bl7) | 0
        hi = hi + Math.imul(ah4, bh7) | 0
        lo = lo + Math.imul(al3, bl8) | 0
        mid = mid + Math.imul(al3, bh8) | 0
        mid = mid + Math.imul(ah3, bl8) | 0
        hi = hi + Math.imul(ah3, bh8) | 0
        lo = lo + Math.imul(al2, bl9) | 0
        mid = mid + Math.imul(al2, bh9) | 0
        mid = mid + Math.imul(ah2, bl9) | 0
        hi = hi + Math.imul(ah2, bh9) | 0
        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0
        w11 &= 67108863
        lo = Math.imul(al9, bl3)
        mid = Math.imul(al9, bh3)
        mid = mid + Math.imul(ah9, bl3) | 0
        hi = Math.imul(ah9, bh3)
        lo = lo + Math.imul(al8, bl4) | 0
        mid = mid + Math.imul(al8, bh4) | 0
        mid = mid + Math.imul(ah8, bl4) | 0
        hi = hi + Math.imul(ah8, bh4) | 0
        lo = lo + Math.imul(al7, bl5) | 0
        mid = mid + Math.imul(al7, bh5) | 0
        mid = mid + Math.imul(ah7, bl5) | 0
        hi = hi + Math.imul(ah7, bh5) | 0
        lo = lo + Math.imul(al6, bl6) | 0
        mid = mid + Math.imul(al6, bh6) | 0
        mid = mid + Math.imul(ah6, bl6) | 0
        hi = hi + Math.imul(ah6, bh6) | 0
        lo = lo + Math.imul(al5, bl7) | 0
        mid = mid + Math.imul(al5, bh7) | 0
        mid = mid + Math.imul(ah5, bl7) | 0
        hi = hi + Math.imul(ah5, bh7) | 0
        lo = lo + Math.imul(al4, bl8) | 0
        mid = mid + Math.imul(al4, bh8) | 0
        mid = mid + Math.imul(ah4, bl8) | 0
        hi = hi + Math.imul(ah4, bh8) | 0
        lo = lo + Math.imul(al3, bl9) | 0
        mid = mid + Math.imul(al3, bh9) | 0
        mid = mid + Math.imul(ah3, bl9) | 0
        hi = hi + Math.imul(ah3, bh9) | 0
        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0
        w12 &= 67108863
        lo = Math.imul(al9, bl4)
        mid = Math.imul(al9, bh4)
        mid = mid + Math.imul(ah9, bl4) | 0
        hi = Math.imul(ah9, bh4)
        lo = lo + Math.imul(al8, bl5) | 0
        mid = mid + Math.imul(al8, bh5) | 0
        mid = mid + Math.imul(ah8, bl5) | 0
        hi = hi + Math.imul(ah8, bh5) | 0
        lo = lo + Math.imul(al7, bl6) | 0
        mid = mid + Math.imul(al7, bh6) | 0
        mid = mid + Math.imul(ah7, bl6) | 0
        hi = hi + Math.imul(ah7, bh6) | 0
        lo = lo + Math.imul(al6, bl7) | 0
        mid = mid + Math.imul(al6, bh7) | 0
        mid = mid + Math.imul(ah6, bl7) | 0
        hi = hi + Math.imul(ah6, bh7) | 0
        lo = lo + Math.imul(al5, bl8) | 0
        mid = mid + Math.imul(al5, bh8) | 0
        mid = mid + Math.imul(ah5, bl8) | 0
        hi = hi + Math.imul(ah5, bh8) | 0
        lo = lo + Math.imul(al4, bl9) | 0
        mid = mid + Math.imul(al4, bh9) | 0
        mid = mid + Math.imul(ah4, bl9) | 0
        hi = hi + Math.imul(ah4, bh9) | 0
        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0
        w13 &= 67108863
        lo = Math.imul(al9, bl5)
        mid = Math.imul(al9, bh5)
        mid = mid + Math.imul(ah9, bl5) | 0
        hi = Math.imul(ah9, bh5)
        lo = lo + Math.imul(al8, bl6) | 0
        mid = mid + Math.imul(al8, bh6) | 0
        mid = mid + Math.imul(ah8, bl6) | 0
        hi = hi + Math.imul(ah8, bh6) | 0
        lo = lo + Math.imul(al7, bl7) | 0
        mid = mid + Math.imul(al7, bh7) | 0
        mid = mid + Math.imul(ah7, bl7) | 0
        hi = hi + Math.imul(ah7, bh7) | 0
        lo = lo + Math.imul(al6, bl8) | 0
        mid = mid + Math.imul(al6, bh8) | 0
        mid = mid + Math.imul(ah6, bl8) | 0
        hi = hi + Math.imul(ah6, bh8) | 0
        lo = lo + Math.imul(al5, bl9) | 0
        mid = mid + Math.imul(al5, bh9) | 0
        mid = mid + Math.imul(ah5, bl9) | 0
        hi = hi + Math.imul(ah5, bh9) | 0
        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0
        w14 &= 67108863
        lo = Math.imul(al9, bl6)
        mid = Math.imul(al9, bh6)
        mid = mid + Math.imul(ah9, bl6) | 0
        hi = Math.imul(ah9, bh6)
        lo = lo + Math.imul(al8, bl7) | 0
        mid = mid + Math.imul(al8, bh7) | 0
        mid = mid + Math.imul(ah8, bl7) | 0
        hi = hi + Math.imul(ah8, bh7) | 0
        lo = lo + Math.imul(al7, bl8) | 0
        mid = mid + Math.imul(al7, bh8) | 0
        mid = mid + Math.imul(ah7, bl8) | 0
        hi = hi + Math.imul(ah7, bh8) | 0
        lo = lo + Math.imul(al6, bl9) | 0
        mid = mid + Math.imul(al6, bh9) | 0
        mid = mid + Math.imul(ah6, bl9) | 0
        hi = hi + Math.imul(ah6, bh9) | 0
        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0
        w15 &= 67108863
        lo = Math.imul(al9, bl7)
        mid = Math.imul(al9, bh7)
        mid = mid + Math.imul(ah9, bl7) | 0
        hi = Math.imul(ah9, bh7)
        lo = lo + Math.imul(al8, bl8) | 0
        mid = mid + Math.imul(al8, bh8) | 0
        mid = mid + Math.imul(ah8, bl8) | 0
        hi = hi + Math.imul(ah8, bh8) | 0
        lo = lo + Math.imul(al7, bl9) | 0
        mid = mid + Math.imul(al7, bh9) | 0
        mid = mid + Math.imul(ah7, bl9) | 0
        hi = hi + Math.imul(ah7, bh9) | 0
        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0
        w16 &= 67108863
        lo = Math.imul(al9, bl8)
        mid = Math.imul(al9, bh8)
        mid = mid + Math.imul(ah9, bl8) | 0
        hi = Math.imul(ah9, bh8)
        lo = lo + Math.imul(al8, bl9) | 0
        mid = mid + Math.imul(al8, bh9) | 0
        mid = mid + Math.imul(ah8, bl9) | 0
        hi = hi + Math.imul(ah8, bh9) | 0
        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0
        w17 &= 67108863
        lo = Math.imul(al9, bl9)
        mid = Math.imul(al9, bh9)
        mid = mid + Math.imul(ah9, bl9) | 0
        hi = Math.imul(ah9, bh9)
        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0
        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0
        w18 &= 67108863
        o[0] = w0
        o[1] = w1
        o[2] = w2
        o[3] = w3
        o[4] = w4
        o[5] = w5
        o[6] = w6
        o[7] = w7
        o[8] = w8
        o[9] = w9
        o[10] = w10
        o[11] = w11
        o[12] = w12
        o[13] = w13
        o[14] = w14
        o[15] = w15
        o[16] = w16
        o[17] = w17
        o[18] = w18
        if (c !== 0) {
          o[19] = c
          out.length++
        }
        return out
      }
      if (!Math.imul) {
        comb10MulTo = smallMulTo
      }
      function bigMulTo(self2, num, out) {
        out.negative = num.negative ^ self2.negative
        out.length = self2.length + num.length
        var carry = 0
        var hncarry = 0
        for (var k = 0; k < out.length - 1; k++) {
          var ncarry = hncarry
          hncarry = 0
          var rword = carry & 67108863
          var maxJ = Math.min(k, num.length - 1)
          for (var j = Math.max(0, k - self2.length + 1); j <= maxJ; j++) {
            var i = k - j
            var a = self2.words[i] | 0
            var b = num.words[j] | 0
            var r = a * b
            var lo = r & 67108863
            ncarry = ncarry + (r / 67108864 | 0) | 0
            lo = lo + rword | 0
            rword = lo & 67108863
            ncarry = ncarry + (lo >>> 26) | 0
            hncarry += ncarry >>> 26
            ncarry &= 67108863
          }
          out.words[k] = rword
          carry = ncarry
          ncarry = hncarry
        }
        if (carry !== 0) {
          out.words[k] = carry
        } else {
          out.length--
        }
        return out._strip()
      }
      function jumboMulTo(self2, num, out) {
        return bigMulTo(self2, num, out)
      }
      BN2.prototype.mulTo = function mulTo(num, out) {
        var res
        var len = this.length + num.length
        if (this.length === 10 && num.length === 10) {
          res = comb10MulTo(this, num, out)
        } else if (len < 63) {
          res = smallMulTo(this, num, out)
        } else if (len < 1024) {
          res = bigMulTo(this, num, out)
        } else {
          res = jumboMulTo(this, num, out)
        }
        return res
      }
      function FFTM(x, y) {
        this.x = x
        this.y = y
      }
      FFTM.prototype.makeRBT = function makeRBT(N) {
        var t = new Array(N)
        var l = BN2.prototype._countBits(N) - 1
        for (var i = 0; i < N; i++) {
          t[i] = this.revBin(i, l, N)
        }
        return t
      }
      FFTM.prototype.revBin = function revBin(x, l, N) {
        if (x === 0 || x === N - 1) return x
        var rb = 0
        for (var i = 0; i < l; i++) {
          rb |= (x & 1) << l - i - 1
          x >>= 1
        }
        return rb
      }
      FFTM.prototype.permute = function permute(rbt, rws, iws, rtws, itws, N) {
        for (var i = 0; i < N; i++) {
          rtws[i] = rws[rbt[i]]
          itws[i] = iws[rbt[i]]
        }
      }
      FFTM.prototype.transform = function transform(rws, iws, rtws, itws, N, rbt) {
        this.permute(rbt, rws, iws, rtws, itws, N)
        for (var s = 1; s < N; s <<= 1) {
          var l = s << 1
          var rtwdf = Math.cos(2 * Math.PI / l)
          var itwdf = Math.sin(2 * Math.PI / l)
          for (var p = 0; p < N; p += l) {
            var rtwdf_ = rtwdf
            var itwdf_ = itwdf
            for (var j = 0; j < s; j++) {
              var re = rtws[p + j]
              var ie = itws[p + j]
              var ro = rtws[p + j + s]
              var io = itws[p + j + s]
              var rx = rtwdf_ * ro - itwdf_ * io
              io = rtwdf_ * io + itwdf_ * ro
              ro = rx
              rtws[p + j] = re + ro
              itws[p + j] = ie + io
              rtws[p + j + s] = re - ro
              itws[p + j + s] = ie - io
              if (j !== l) {
                rx = rtwdf * rtwdf_ - itwdf * itwdf_
                itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_
                rtwdf_ = rx
              }
            }
          }
        }
      }
      FFTM.prototype.guessLen13b = function guessLen13b(n, m) {
        var N = Math.max(m, n) | 1
        var odd = N & 1
        var i = 0
        for (N = N / 2 | 0; N; N = N >>> 1) {
          i++
        }
        return 1 << i + 1 + odd
      }
      FFTM.prototype.conjugate = function conjugate(rws, iws, N) {
        if (N <= 1) return
        for (var i = 0; i < N / 2; i++) {
          var t = rws[i]
          rws[i] = rws[N - i - 1]
          rws[N - i - 1] = t
          t = iws[i]
          iws[i] = -iws[N - i - 1]
          iws[N - i - 1] = -t
        }
      }
      FFTM.prototype.normalize13b = function normalize13b(ws, N) {
        var carry = 0
        for (var i = 0; i < N / 2; i++) {
          var w = Math.round(ws[2 * i + 1] / N) * 8192 + Math.round(ws[2 * i] / N) + carry
          ws[i] = w & 67108863
          if (w < 67108864) {
            carry = 0
          } else {
            carry = w / 67108864 | 0
          }
        }
        return ws
      }
      FFTM.prototype.convert13b = function convert13b(ws, len, rws, N) {
        var carry = 0
        for (var i = 0; i < len; i++) {
          carry = carry + (ws[i] | 0)
          rws[2 * i] = carry & 8191
          carry = carry >>> 13
          rws[2 * i + 1] = carry & 8191
          carry = carry >>> 13
        }
        for (i = 2 * len; i < N; ++i) {
          rws[i] = 0
        }
        assert(carry === 0)
        assert((carry & ~8191) === 0)
      }
      FFTM.prototype.stub = function stub(N) {
        var ph = new Array(N)
        for (var i = 0; i < N; i++) {
          ph[i] = 0
        }
        return ph
      }
      FFTM.prototype.mulp = function mulp(x, y, out) {
        var N = 2 * this.guessLen13b(x.length, y.length)
        var rbt = this.makeRBT(N)
        var _ = this.stub(N)
        var rws = new Array(N)
        var rwst = new Array(N)
        var iwst = new Array(N)
        var nrws = new Array(N)
        var nrwst = new Array(N)
        var niwst = new Array(N)
        var rmws = out.words
        rmws.length = N
        this.convert13b(x.words, x.length, rws, N)
        this.convert13b(y.words, y.length, nrws, N)
        this.transform(rws, _, rwst, iwst, N, rbt)
        this.transform(nrws, _, nrwst, niwst, N, rbt)
        for (var i = 0; i < N; i++) {
          var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i]
          iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i]
          rwst[i] = rx
        }
        this.conjugate(rwst, iwst, N)
        this.transform(rwst, iwst, rmws, _, N, rbt)
        this.conjugate(rmws, _, N)
        this.normalize13b(rmws, N)
        out.negative = x.negative ^ y.negative
        out.length = x.length + y.length
        return out._strip()
      }
      BN2.prototype.mul = function mul(num) {
        var out = new BN2(null)
        out.words = new Array(this.length + num.length)
        return this.mulTo(num, out)
      }
      BN2.prototype.mulf = function mulf(num) {
        var out = new BN2(null)
        out.words = new Array(this.length + num.length)
        return jumboMulTo(this, num, out)
      }
      BN2.prototype.imul = function imul(num) {
        return this.clone().mulTo(num, this)
      }
      BN2.prototype.imuln = function imuln(num) {
        var isNegNum = num < 0
        if (isNegNum) num = -num
        assert(typeof num === "number")
        assert(num < 67108864)
        var carry = 0
        for (var i = 0; i < this.length; i++) {
          var w = (this.words[i] | 0) * num
          var lo = (w & 67108863) + (carry & 67108863)
          carry >>= 26
          carry += w / 67108864 | 0
          carry += lo >>> 26
          this.words[i] = lo & 67108863
        }
        if (carry !== 0) {
          this.words[i] = carry
          this.length++
        }
        return isNegNum ? this.ineg() : this
      }
      BN2.prototype.muln = function muln(num) {
        return this.clone().imuln(num)
      }
      BN2.prototype.sqr = function sqr() {
        return this.mul(this)
      }
      BN2.prototype.isqr = function isqr() {
        return this.imul(this.clone())
      }
      BN2.prototype.pow = function pow(num) {
        var w = toBitArray(num)
        if (w.length === 0) return new BN2(1)
        var res = this
        for (var i = 0; i < w.length; i++, res = res.sqr()) {
          if (w[i] !== 0) break
        }
        if (++i < w.length) {
          for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
            if (w[i] === 0) continue
            res = res.mul(q)
          }
        }
        return res
      }
      BN2.prototype.iushln = function iushln(bits) {
        assert(typeof bits === "number" && bits >= 0)
        var r = bits % 26
        var s = (bits - r) / 26
        var carryMask = 67108863 >>> 26 - r << 26 - r
        var i
        if (r !== 0) {
          var carry = 0
          for (i = 0; i < this.length; i++) {
            var newCarry = this.words[i] & carryMask
            var c = (this.words[i] | 0) - newCarry << r
            this.words[i] = c | carry
            carry = newCarry >>> 26 - r
          }
          if (carry) {
            this.words[i] = carry
            this.length++
          }
        }
        if (s !== 0) {
          for (i = this.length - 1; i >= 0; i--) {
            this.words[i + s] = this.words[i]
          }
          for (i = 0; i < s; i++) {
            this.words[i] = 0
          }
          this.length += s
        }
        return this._strip()
      }
      BN2.prototype.ishln = function ishln(bits) {
        assert(this.negative === 0)
        return this.iushln(bits)
      }
      BN2.prototype.iushrn = function iushrn(bits, hint, extended) {
        assert(typeof bits === "number" && bits >= 0)
        var h
        if (hint) {
          h = (hint - hint % 26) / 26
        } else {
          h = 0
        }
        var r = bits % 26
        var s = Math.min((bits - r) / 26, this.length)
        var mask = 67108863 ^ 67108863 >>> r << r
        var maskedWords = extended
        h -= s
        h = Math.max(0, h)
        if (maskedWords) {
          for (var i = 0; i < s; i++) {
            maskedWords.words[i] = this.words[i]
          }
          maskedWords.length = s
        }
        if (s === 0) {
        } else if (this.length > s) {
          this.length -= s
          for (i = 0; i < this.length; i++) {
            this.words[i] = this.words[i + s]
          }
        } else {
          this.words[0] = 0
          this.length = 1
        }
        var carry = 0
        for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
          var word = this.words[i] | 0
          this.words[i] = carry << 26 - r | word >>> r
          carry = word & mask
        }
        if (maskedWords && carry !== 0) {
          maskedWords.words[maskedWords.length++] = carry
        }
        if (this.length === 0) {
          this.words[0] = 0
          this.length = 1
        }
        return this._strip()
      }
      BN2.prototype.ishrn = function ishrn(bits, hint, extended) {
        assert(this.negative === 0)
        return this.iushrn(bits, hint, extended)
      }
      BN2.prototype.shln = function shln(bits) {
        return this.clone().ishln(bits)
      }
      BN2.prototype.ushln = function ushln(bits) {
        return this.clone().iushln(bits)
      }
      BN2.prototype.shrn = function shrn(bits) {
        return this.clone().ishrn(bits)
      }
      BN2.prototype.ushrn = function ushrn(bits) {
        return this.clone().iushrn(bits)
      }
      BN2.prototype.testn = function testn(bit) {
        assert(typeof bit === "number" && bit >= 0)
        var r = bit % 26
        var s = (bit - r) / 26
        var q = 1 << r
        if (this.length <= s) return false
        var w = this.words[s]
        return !!(w & q)
      }
      BN2.prototype.imaskn = function imaskn(bits) {
        assert(typeof bits === "number" && bits >= 0)
        var r = bits % 26
        var s = (bits - r) / 26
        assert(this.negative === 0, "imaskn works only with positive numbers")
        if (this.length <= s) {
          return this
        }
        if (r !== 0) {
          s++
        }
        this.length = Math.min(s, this.length)
        if (r !== 0) {
          var mask = 67108863 ^ 67108863 >>> r << r
          this.words[this.length - 1] &= mask
        }
        return this._strip()
      }
      BN2.prototype.maskn = function maskn(bits) {
        return this.clone().imaskn(bits)
      }
      BN2.prototype.iaddn = function iaddn(num) {
        assert(typeof num === "number")
        assert(num < 67108864)
        if (num < 0) return this.isubn(-num)
        if (this.negative !== 0) {
          if (this.length === 1 && (this.words[0] | 0) <= num) {
            this.words[0] = num - (this.words[0] | 0)
            this.negative = 0
            return this
          }
          this.negative = 0
          this.isubn(num)
          this.negative = 1
          return this
        }
        return this._iaddn(num)
      }
      BN2.prototype._iaddn = function _iaddn(num) {
        this.words[0] += num
        for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) {
          this.words[i] -= 67108864
          if (i === this.length - 1) {
            this.words[i + 1] = 1
          } else {
            this.words[i + 1]++
          }
        }
        this.length = Math.max(this.length, i + 1)
        return this
      }
      BN2.prototype.isubn = function isubn(num) {
        assert(typeof num === "number")
        assert(num < 67108864)
        if (num < 0) return this.iaddn(-num)
        if (this.negative !== 0) {
          this.negative = 0
          this.iaddn(num)
          this.negative = 1
          return this
        }
        this.words[0] -= num
        if (this.length === 1 && this.words[0] < 0) {
          this.words[0] = -this.words[0]
          this.negative = 1
        } else {
          for (var i = 0; i < this.length && this.words[i] < 0; i++) {
            this.words[i] += 67108864
            this.words[i + 1] -= 1
          }
        }
        return this._strip()
      }
      BN2.prototype.addn = function addn(num) {
        return this.clone().iaddn(num)
      }
      BN2.prototype.subn = function subn(num) {
        return this.clone().isubn(num)
      }
      BN2.prototype.iabs = function iabs() {
        this.negative = 0
        return this
      }
      BN2.prototype.abs = function abs() {
        return this.clone().iabs()
      }
      BN2.prototype._ishlnsubmul = function _ishlnsubmul(num, mul, shift) {
        var len = num.length + shift
        var i
        this._expand(len)
        var w
        var carry = 0
        for (i = 0; i < num.length; i++) {
          w = (this.words[i + shift] | 0) + carry
          var right = (num.words[i] | 0) * mul
          w -= right & 67108863
          carry = (w >> 26) - (right / 67108864 | 0)
          this.words[i + shift] = w & 67108863
        }
        for (; i < this.length - shift; i++) {
          w = (this.words[i + shift] | 0) + carry
          carry = w >> 26
          this.words[i + shift] = w & 67108863
        }
        if (carry === 0) return this._strip()
        assert(carry === -1)
        carry = 0
        for (i = 0; i < this.length; i++) {
          w = -(this.words[i] | 0) + carry
          carry = w >> 26
          this.words[i] = w & 67108863
        }
        this.negative = 1
        return this._strip()
      }
      BN2.prototype._wordDiv = function _wordDiv(num, mode) {
        var shift = this.length - num.length
        var a = this.clone()
        var b = num
        var bhi = b.words[b.length - 1] | 0
        var bhiBits = this._countBits(bhi)
        shift = 26 - bhiBits
        if (shift !== 0) {
          b = b.ushln(shift)
          a.iushln(shift)
          bhi = b.words[b.length - 1] | 0
        }
        var m = a.length - b.length
        var q
        if (mode !== "mod") {
          q = new BN2(null)
          q.length = m + 1
          q.words = new Array(q.length)
          for (var i = 0; i < q.length; i++) {
            q.words[i] = 0
          }
        }
        var diff = a.clone()._ishlnsubmul(b, 1, m)
        if (diff.negative === 0) {
          a = diff
          if (q) {
            q.words[m] = 1
          }
        }
        for (var j = m - 1; j >= 0; j--) {
          var qj = (a.words[b.length + j] | 0) * 67108864 + (a.words[b.length + j - 1] | 0)
          qj = Math.min(qj / bhi | 0, 67108863)
          a._ishlnsubmul(b, qj, j)
          while (a.negative !== 0) {
            qj--
            a.negative = 0
            a._ishlnsubmul(b, 1, j)
            if (!a.isZero()) {
              a.negative ^= 1
            }
          }
          if (q) {
            q.words[j] = qj
          }
        }
        if (q) {
          q._strip()
        }
        a._strip()
        if (mode !== "div" && shift !== 0) {
          a.iushrn(shift)
        }
        return {
          div: q || null,
          mod: a
        }
      }
      BN2.prototype.divmod = function divmod(num, mode, positive) {
        assert(!num.isZero())
        if (this.isZero()) {
          return {
            div: new BN2(0),
            mod: new BN2(0)
          }
        }
        var div, mod, res
        if (this.negative !== 0 && num.negative === 0) {
          res = this.neg().divmod(num, mode)
          if (mode !== "mod") {
            div = res.div.neg()
          }
          if (mode !== "div") {
            mod = res.mod.neg()
            if (positive && mod.negative !== 0) {
              mod.iadd(num)
            }
          }
          return {
            div,
            mod
          }
        }
        if (this.negative === 0 && num.negative !== 0) {
          res = this.divmod(num.neg(), mode)
          if (mode !== "mod") {
            div = res.div.neg()
          }
          return {
            div,
            mod: res.mod
          }
        }
        if ((this.negative & num.negative) !== 0) {
          res = this.neg().divmod(num.neg(), mode)
          if (mode !== "div") {
            mod = res.mod.neg()
            if (positive && mod.negative !== 0) {
              mod.isub(num)
            }
          }
          return {
            div: res.div,
            mod
          }
        }
        if (num.length > this.length || this.cmp(num) < 0) {
          return {
            div: new BN2(0),
            mod: this
          }
        }
        if (num.length === 1) {
          if (mode === "div") {
            return {
              div: this.divn(num.words[0]),
              mod: null
            }
          }
          if (mode === "mod") {
            return {
              div: null,
              mod: new BN2(this.modrn(num.words[0]))
            }
          }
          return {
            div: this.divn(num.words[0]),
            mod: new BN2(this.modrn(num.words[0]))
          }
        }
        return this._wordDiv(num, mode)
      }
      BN2.prototype.div = function div(num) {
        return this.divmod(num, "div", false).div
      }
      BN2.prototype.mod = function mod(num) {
        return this.divmod(num, "mod", false).mod
      }
      BN2.prototype.umod = function umod(num) {
        return this.divmod(num, "mod", true).mod
      }
      BN2.prototype.divRound = function divRound(num) {
        var dm = this.divmod(num)
        if (dm.mod.isZero()) return dm.div
        var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod
        var half = num.ushrn(1)
        var r2 = num.andln(1)
        var cmp = mod.cmp(half)
        if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div
        return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1)
      }
      BN2.prototype.modrn = function modrn(num) {
        var isNegNum = num < 0
        if (isNegNum) num = -num
        assert(num <= 67108863)
        var p = (1 << 26) % num
        var acc = 0
        for (var i = this.length - 1; i >= 0; i--) {
          acc = (p * acc + (this.words[i] | 0)) % num
        }
        return isNegNum ? -acc : acc
      }
      BN2.prototype.modn = function modn(num) {
        return this.modrn(num)
      }
      BN2.prototype.idivn = function idivn(num) {
        var isNegNum = num < 0
        if (isNegNum) num = -num
        assert(num <= 67108863)
        var carry = 0
        for (var i = this.length - 1; i >= 0; i--) {
          var w = (this.words[i] | 0) + carry * 67108864
          this.words[i] = w / num | 0
          carry = w % num
        }
        this._strip()
        return isNegNum ? this.ineg() : this
      }
      BN2.prototype.divn = function divn(num) {
        return this.clone().idivn(num)
      }
      BN2.prototype.egcd = function egcd(p) {
        assert(p.negative === 0)
        assert(!p.isZero())
        var x = this
        var y = p.clone()
        if (x.negative !== 0) {
          x = x.umod(p)
        } else {
          x = x.clone()
        }
        var A = new BN2(1)
        var B = new BN2(0)
        var C = new BN2(0)
        var D = new BN2(1)
        var g = 0
        while (x.isEven() && y.isEven()) {
          x.iushrn(1)
          y.iushrn(1)
          ++g
        }
        var yp = y.clone()
        var xp = x.clone()
        while (!x.isZero()) {
          for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
          if (i > 0) {
            x.iushrn(i)
            while (i-- > 0) {
              if (A.isOdd() || B.isOdd()) {
                A.iadd(yp)
                B.isub(xp)
              }
              A.iushrn(1)
              B.iushrn(1)
            }
          }
          for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
          if (j > 0) {
            y.iushrn(j)
            while (j-- > 0) {
              if (C.isOdd() || D.isOdd()) {
                C.iadd(yp)
                D.isub(xp)
              }
              C.iushrn(1)
              D.iushrn(1)
            }
          }
          if (x.cmp(y) >= 0) {
            x.isub(y)
            A.isub(C)
            B.isub(D)
          } else {
            y.isub(x)
            C.isub(A)
            D.isub(B)
          }
        }
        return {
          a: C,
          b: D,
          gcd: y.iushln(g)
        }
      }
      BN2.prototype._invmp = function _invmp(p) {
        assert(p.negative === 0)
        assert(!p.isZero())
        var a = this
        var b = p.clone()
        if (a.negative !== 0) {
          a = a.umod(p)
        } else {
          a = a.clone()
        }
        var x1 = new BN2(1)
        var x2 = new BN2(0)
        var delta = b.clone()
        while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
          for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
          if (i > 0) {
            a.iushrn(i)
            while (i-- > 0) {
              if (x1.isOdd()) {
                x1.iadd(delta)
              }
              x1.iushrn(1)
            }
          }
          for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
          if (j > 0) {
            b.iushrn(j)
            while (j-- > 0) {
              if (x2.isOdd()) {
                x2.iadd(delta)
              }
              x2.iushrn(1)
            }
          }
          if (a.cmp(b) >= 0) {
            a.isub(b)
            x1.isub(x2)
          } else {
            b.isub(a)
            x2.isub(x1)
          }
        }
        var res
        if (a.cmpn(1) === 0) {
          res = x1
        } else {
          res = x2
        }
        if (res.cmpn(0) < 0) {
          res.iadd(p)
        }
        return res
      }
      BN2.prototype.gcd = function gcd(num) {
        if (this.isZero()) return num.abs()
        if (num.isZero()) return this.abs()
        var a = this.clone()
        var b = num.clone()
        a.negative = 0
        b.negative = 0
        for (var shift = 0; a.isEven() && b.isEven(); shift++) {
          a.iushrn(1)
          b.iushrn(1)
        }
        do {
          while (a.isEven()) {
            a.iushrn(1)
          }
          while (b.isEven()) {
            b.iushrn(1)
          }
          var r = a.cmp(b)
          if (r < 0) {
            var t = a
            a = b
            b = t
          } else if (r === 0 || b.cmpn(1) === 0) {
            break
          }
          a.isub(b)
        } while (true)
        return b.iushln(shift)
      }
      BN2.prototype.invm = function invm(num) {
        return this.egcd(num).a.umod(num)
      }
      BN2.prototype.isEven = function isEven() {
        return (this.words[0] & 1) === 0
      }
      BN2.prototype.isOdd = function isOdd() {
        return (this.words[0] & 1) === 1
      }
      BN2.prototype.andln = function andln(num) {
        return this.words[0] & num
      }
      BN2.prototype.bincn = function bincn(bit) {
        assert(typeof bit === "number")
        var r = bit % 26
        var s = (bit - r) / 26
        var q = 1 << r
        if (this.length <= s) {
          this._expand(s + 1)
          this.words[s] |= q
          return this
        }
        var carry = q
        for (var i = s; carry !== 0 && i < this.length; i++) {
          var w = this.words[i] | 0
          w += carry
          carry = w >>> 26
          w &= 67108863
          this.words[i] = w
        }
        if (carry !== 0) {
          this.words[i] = carry
          this.length++
        }
        return this
      }
      BN2.prototype.isZero = function isZero() {
        return this.length === 1 && this.words[0] === 0
      }
      BN2.prototype.cmpn = function cmpn(num) {
        var negative = num < 0
        if (this.negative !== 0 && !negative) return -1
        if (this.negative === 0 && negative) return 1
        this._strip()
        var res
        if (this.length > 1) {
          res = 1
        } else {
          if (negative) {
            num = -num
          }
          assert(num <= 67108863, "Number is too big")
          var w = this.words[0] | 0
          res = w === num ? 0 : w < num ? -1 : 1
        }
        if (this.negative !== 0) return -res | 0
        return res
      }
      BN2.prototype.cmp = function cmp(num) {
        if (this.negative !== 0 && num.negative === 0) return -1
        if (this.negative === 0 && num.negative !== 0) return 1
        var res = this.ucmp(num)
        if (this.negative !== 0) return -res | 0
        return res
      }
      BN2.prototype.ucmp = function ucmp(num) {
        if (this.length > num.length) return 1
        if (this.length < num.length) return -1
        var res = 0
        for (var i = this.length - 1; i >= 0; i--) {
          var a = this.words[i] | 0
          var b = num.words[i] | 0
          if (a === b) continue
          if (a < b) {
            res = -1
          } else if (a > b) {
            res = 1
          }
          break
        }
        return res
      }
      BN2.prototype.gtn = function gtn(num) {
        return this.cmpn(num) === 1
      }
      BN2.prototype.gt = function gt(num) {
        return this.cmp(num) === 1
      }
      BN2.prototype.gten = function gten(num) {
        return this.cmpn(num) >= 0
      }
      BN2.prototype.gte = function gte(num) {
        return this.cmp(num) >= 0
      }
      BN2.prototype.ltn = function ltn(num) {
        return this.cmpn(num) === -1
      }
      BN2.prototype.lt = function lt(num) {
        return this.cmp(num) === -1
      }
      BN2.prototype.lten = function lten(num) {
        return this.cmpn(num) <= 0
      }
      BN2.prototype.lte = function lte(num) {
        return this.cmp(num) <= 0
      }
      BN2.prototype.eqn = function eqn(num) {
        return this.cmpn(num) === 0
      }
      BN2.prototype.eq = function eq(num) {
        return this.cmp(num) === 0
      }
      BN2.red = function red(num) {
        return new Red(num)
      }
      BN2.prototype.toRed = function toRed(ctx) {
        assert(!this.red, "Already a number in reduction context")
        assert(this.negative === 0, "red works only with positives")
        return ctx.convertTo(this)._forceRed(ctx)
      }
      BN2.prototype.fromRed = function fromRed() {
        assert(this.red, "fromRed works only with numbers in reduction context")
        return this.red.convertFrom(this)
      }
      BN2.prototype._forceRed = function _forceRed(ctx) {
        this.red = ctx
        return this
      }
      BN2.prototype.forceRed = function forceRed(ctx) {
        assert(!this.red, "Already a number in reduction context")
        return this._forceRed(ctx)
      }
      BN2.prototype.redAdd = function redAdd(num) {
        assert(this.red, "redAdd works only with red numbers")
        return this.red.add(this, num)
      }
      BN2.prototype.redIAdd = function redIAdd(num) {
        assert(this.red, "redIAdd works only with red numbers")
        return this.red.iadd(this, num)
      }
      BN2.prototype.redSub = function redSub(num) {
        assert(this.red, "redSub works only with red numbers")
        return this.red.sub(this, num)
      }
      BN2.prototype.redISub = function redISub(num) {
        assert(this.red, "redISub works only with red numbers")
        return this.red.isub(this, num)
      }
      BN2.prototype.redShl = function redShl(num) {
        assert(this.red, "redShl works only with red numbers")
        return this.red.shl(this, num)
      }
      BN2.prototype.redMul = function redMul(num) {
        assert(this.red, "redMul works only with red numbers")
        this.red._verify2(this, num)
        return this.red.mul(this, num)
      }
      BN2.prototype.redIMul = function redIMul(num) {
        assert(this.red, "redMul works only with red numbers")
        this.red._verify2(this, num)
        return this.red.imul(this, num)
      }
      BN2.prototype.redSqr = function redSqr() {
        assert(this.red, "redSqr works only with red numbers")
        this.red._verify1(this)
        return this.red.sqr(this)
      }
      BN2.prototype.redISqr = function redISqr() {
        assert(this.red, "redISqr works only with red numbers")
        this.red._verify1(this)
        return this.red.isqr(this)
      }
      BN2.prototype.redSqrt = function redSqrt() {
        assert(this.red, "redSqrt works only with red numbers")
        this.red._verify1(this)
        return this.red.sqrt(this)
      }
      BN2.prototype.redInvm = function redInvm() {
        assert(this.red, "redInvm works only with red numbers")
        this.red._verify1(this)
        return this.red.invm(this)
      }
      BN2.prototype.redNeg = function redNeg() {
        assert(this.red, "redNeg works only with red numbers")
        this.red._verify1(this)
        return this.red.neg(this)
      }
      BN2.prototype.redPow = function redPow(num) {
        assert(this.red && !num.red, "redPow(normalNum)")
        this.red._verify1(this)
        return this.red.pow(this, num)
      }
      var primes = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      }
      function MPrime(name, p) {
        this.name = name
        this.p = new BN2(p, 16)
        this.n = this.p.bitLength()
        this.k = new BN2(1).iushln(this.n).isub(this.p)
        this.tmp = this._tmp()
      }
      MPrime.prototype._tmp = function _tmp() {
        var tmp = new BN2(null)
        tmp.words = new Array(Math.ceil(this.n / 13))
        return tmp
      }
      MPrime.prototype.ireduce = function ireduce(num) {
        var r = num
        var rlen
        do {
          this.split(r, this.tmp)
          r = this.imulK(r)
          r = r.iadd(this.tmp)
          rlen = r.bitLength()
        } while (rlen > this.n)
        var cmp = rlen < this.n ? -1 : r.ucmp(this.p)
        if (cmp === 0) {
          r.words[0] = 0
          r.length = 1
        } else if (cmp > 0) {
          r.isub(this.p)
        } else {
          if (r.strip !== void 0) {
            r.strip()
          } else {
            r._strip()
          }
        }
        return r
      }
      MPrime.prototype.split = function split(input, out) {
        input.iushrn(this.n, 0, out)
      }
      MPrime.prototype.imulK = function imulK(num) {
        return num.imul(this.k)
      }
      function K256() {
        MPrime.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        )
      }
      inherits(K256, MPrime)
      K256.prototype.split = function split(input, output) {
        var mask = 4194303
        var outLen = Math.min(input.length, 9)
        for (var i = 0; i < outLen; i++) {
          output.words[i] = input.words[i]
        }
        output.length = outLen
        if (input.length <= 9) {
          input.words[0] = 0
          input.length = 1
          return
        }
        var prev = input.words[9]
        output.words[output.length++] = prev & mask
        for (i = 10; i < input.length; i++) {
          var next = input.words[i] | 0
          input.words[i - 10] = (next & mask) << 4 | prev >>> 22
          prev = next
        }
        prev >>>= 22
        input.words[i - 10] = prev
        if (prev === 0 && input.length > 10) {
          input.length -= 10
        } else {
          input.length -= 9
        }
      }
      K256.prototype.imulK = function imulK(num) {
        num.words[num.length] = 0
        num.words[num.length + 1] = 0
        num.length += 2
        var lo = 0
        for (var i = 0; i < num.length; i++) {
          var w = num.words[i] | 0
          lo += w * 977
          num.words[i] = lo & 67108863
          lo = w * 64 + (lo / 67108864 | 0)
        }
        if (num.words[num.length - 1] === 0) {
          num.length--
          if (num.words[num.length - 1] === 0) {
            num.length--
          }
        }
        return num
      }
      function P224() {
        MPrime.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        )
      }
      inherits(P224, MPrime)
      function P192() {
        MPrime.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        )
      }
      inherits(P192, MPrime)
      function P25519() {
        MPrime.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        )
      }
      inherits(P25519, MPrime)
      P25519.prototype.imulK = function imulK(num) {
        var carry = 0
        for (var i = 0; i < num.length; i++) {
          var hi = (num.words[i] | 0) * 19 + carry
          var lo = hi & 67108863
          hi >>>= 26
          num.words[i] = lo
          carry = hi
        }
        if (carry !== 0) {
          num.words[num.length++] = carry
        }
        return num
      }
      BN2._prime = function prime(name) {
        if (primes[name]) return primes[name]
        var prime2
        if (name === "k256") {
          prime2 = new K256()
        } else if (name === "p224") {
          prime2 = new P224()
        } else if (name === "p192") {
          prime2 = new P192()
        } else if (name === "p25519") {
          prime2 = new P25519()
        } else {
          throw new Error("Unknown prime " + name)
        }
        primes[name] = prime2
        return prime2
      }
      function Red(m) {
        if (typeof m === "string") {
          var prime = BN2._prime(m)
          this.m = prime.p
          this.prime = prime
        } else {
          assert(m.gtn(1), "modulus must be greater than 1")
          this.m = m
          this.prime = null
        }
      }
      Red.prototype._verify1 = function _verify1(a) {
        assert(a.negative === 0, "red works only with positives")
        assert(a.red, "red works only with red numbers")
      }
      Red.prototype._verify2 = function _verify2(a, b) {
        assert((a.negative | b.negative) === 0, "red works only with positives")
        assert(
          a.red && a.red === b.red,
          "red works only with red numbers"
        )
      }
      Red.prototype.imod = function imod(a) {
        if (this.prime) return this.prime.ireduce(a)._forceRed(this)
        move(a, a.umod(this.m)._forceRed(this))
        return a
      }
      Red.prototype.neg = function neg(a) {
        if (a.isZero()) {
          return a.clone()
        }
        return this.m.sub(a)._forceRed(this)
      }
      Red.prototype.add = function add(a, b) {
        this._verify2(a, b)
        var res = a.add(b)
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m)
        }
        return res._forceRed(this)
      }
      Red.prototype.iadd = function iadd(a, b) {
        this._verify2(a, b)
        var res = a.iadd(b)
        if (res.cmp(this.m) >= 0) {
          res.isub(this.m)
        }
        return res
      }
      Red.prototype.sub = function sub(a, b) {
        this._verify2(a, b)
        var res = a.sub(b)
        if (res.cmpn(0) < 0) {
          res.iadd(this.m)
        }
        return res._forceRed(this)
      }
      Red.prototype.isub = function isub(a, b) {
        this._verify2(a, b)
        var res = a.isub(b)
        if (res.cmpn(0) < 0) {
          res.iadd(this.m)
        }
        return res
      }
      Red.prototype.shl = function shl(a, num) {
        this._verify1(a)
        return this.imod(a.ushln(num))
      }
      Red.prototype.imul = function imul(a, b) {
        this._verify2(a, b)
        return this.imod(a.imul(b))
      }
      Red.prototype.mul = function mul(a, b) {
        this._verify2(a, b)
        return this.imod(a.mul(b))
      }
      Red.prototype.isqr = function isqr(a) {
        return this.imul(a, a.clone())
      }
      Red.prototype.sqr = function sqr(a) {
        return this.mul(a, a)
      }
      Red.prototype.sqrt = function sqrt2(a) {
        if (a.isZero()) return a.clone()
        var mod3 = this.m.andln(3)
        assert(mod3 % 2 === 1)
        if (mod3 === 3) {
          var pow = this.m.add(new BN2(1)).iushrn(2)
          return this.pow(a, pow)
        }
        var q = this.m.subn(1)
        var s = 0
        while (!q.isZero() && q.andln(1) === 0) {
          s++
          q.iushrn(1)
        }
        assert(!q.isZero())
        var one = new BN2(1).toRed(this)
        var nOne = one.redNeg()
        var lpow = this.m.subn(1).iushrn(1)
        var z = this.m.bitLength()
        z = new BN2(2 * z * z).toRed(this)
        while (this.pow(z, lpow).cmp(nOne) !== 0) {
          z.redIAdd(nOne)
        }
        var c = this.pow(z, q)
        var r = this.pow(a, q.addn(1).iushrn(1))
        var t = this.pow(a, q)
        var m = s
        while (t.cmp(one) !== 0) {
          var tmp = t
          for (var i = 0; tmp.cmp(one) !== 0; i++) {
            tmp = tmp.redSqr()
          }
          assert(i < m)
          var b = this.pow(c, new BN2(1).iushln(m - i - 1))
          r = r.redMul(b)
          c = b.redSqr()
          t = t.redMul(c)
          m = i
        }
        return r
      }
      Red.prototype.invm = function invm(a) {
        var inv = a._invmp(this.m)
        if (inv.negative !== 0) {
          inv.negative = 0
          return this.imod(inv).redNeg()
        } else {
          return this.imod(inv)
        }
      }
      Red.prototype.pow = function pow(a, num) {
        if (num.isZero()) return new BN2(1).toRed(this)
        if (num.cmpn(1) === 0) return a.clone()
        var windowSize = 4
        var wnd = new Array(1 << windowSize)
        wnd[0] = new BN2(1).toRed(this)
        wnd[1] = a
        for (var i = 2; i < wnd.length; i++) {
          wnd[i] = this.mul(wnd[i - 1], a)
        }
        var res = wnd[0]
        var current = 0
        var currentLen = 0
        var start = num.bitLength() % 26
        if (start === 0) {
          start = 26
        }
        for (i = num.length - 1; i >= 0; i--) {
          var word = num.words[i]
          for (var j = start - 1; j >= 0; j--) {
            var bit = word >> j & 1
            if (res !== wnd[0]) {
              res = this.sqr(res)
            }
            if (bit === 0 && current === 0) {
              currentLen = 0
              continue
            }
            current <<= 1
            current |= bit
            currentLen++
            if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue
            res = this.mul(res, wnd[current])
            currentLen = 0
            current = 0
          }
          start = 26
        }
        return res
      }
      Red.prototype.convertTo = function convertTo(num) {
        var r = num.umod(this.m)
        return r === num ? r.clone() : r
      }
      Red.prototype.convertFrom = function convertFrom(num) {
        var res = num.clone()
        res.red = null
        return res
      }
      BN2.mont = function mont(num) {
        return new Mont(num)
      }
      function Mont(m) {
        Red.call(this, m)
        this.shift = this.m.bitLength()
        if (this.shift % 26 !== 0) {
          this.shift += 26 - this.shift % 26
        }
        this.r = new BN2(1).iushln(this.shift)
        this.r2 = this.imod(this.r.sqr())
        this.rinv = this.r._invmp(this.m)
        this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)
        this.minv = this.minv.umod(this.r)
        this.minv = this.r.sub(this.minv)
      }
      inherits(Mont, Red)
      Mont.prototype.convertTo = function convertTo(num) {
        return this.imod(num.ushln(this.shift))
      }
      Mont.prototype.convertFrom = function convertFrom(num) {
        var r = this.imod(num.mul(this.rinv))
        r.red = null
        return r
      }
      Mont.prototype.imul = function imul(a, b) {
        if (a.isZero() || b.isZero()) {
          a.words[0] = 0
          a.length = 1
          return a
        }
        var t = a.imul(b)
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
        var u = t.isub(c).iushrn(this.shift)
        var res = u
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m)
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m)
        }
        return res._forceRed(this)
      }
      Mont.prototype.mul = function mul(a, b) {
        if (a.isZero() || b.isZero()) return new BN2(0)._forceRed(this)
        var t = a.mul(b)
        var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m)
        var u = t.isub(c).iushrn(this.shift)
        var res = u
        if (u.cmp(this.m) >= 0) {
          res = u.isub(this.m)
        } else if (u.cmpn(0) < 0) {
          res = u.iadd(this.m)
        }
        return res._forceRed(this)
      }
      Mont.prototype.invm = function invm(a) {
        var res = this.imod(a._invmp(this.m).mul(this.r2))
        return res._forceRed(this)
      }
    })(typeof module === "undefined" || module, exports)
  }
})

// ../../node_modules/js-sha3/src/sha3.js
var require_sha3 = __commonJS({
  "../../node_modules/js-sha3/src/sha3.js"(exports, module) {
    (function () {
      "use strict"
      var INPUT_ERROR = "input is invalid type"
      var FINALIZE_ERROR = "finalize already called"
      var WINDOW = typeof window === "object"
      var root = WINDOW ? window : {}
      if (root.JS_SHA3_NO_WINDOW) {
        WINDOW = false
      }
      var WEB_WORKER = !WINDOW && typeof self === "object"
      var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node
      if (NODE_JS) {
        root = global
      } else if (WEB_WORKER) {
        root = self
      }
      var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module === "object" && module.exports
      var AMD = typeof define === "function" && define.amd
      var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined"
      var HEX_CHARS = "0123456789abcdef".split("")
      var SHAKE_PADDING = [31, 7936, 2031616, 520093696]
      var CSHAKE_PADDING = [4, 1024, 262144, 67108864]
      var KECCAK_PADDING = [1, 256, 65536, 16777216]
      var PADDING = [6, 1536, 393216, 100663296]
      var SHIFT = [0, 8, 16, 24]
      var RC = [
        1,
        0,
        32898,
        0,
        32906,
        2147483648,
        2147516416,
        2147483648,
        32907,
        0,
        2147483649,
        0,
        2147516545,
        2147483648,
        32777,
        2147483648,
        138,
        0,
        136,
        0,
        2147516425,
        0,
        2147483658,
        0,
        2147516555,
        0,
        139,
        2147483648,
        32905,
        2147483648,
        32771,
        2147483648,
        32770,
        2147483648,
        128,
        2147483648,
        32778,
        0,
        2147483658,
        2147483648,
        2147516545,
        2147483648,
        32896,
        2147483648,
        2147483649,
        0,
        2147516424,
        2147483648
      ]
      var BITS = [224, 256, 384, 512]
      var SHAKE_BITS = [128, 256]
      var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array", "digest"]
      var CSHAKE_BYTEPAD = {
        "128": 168,
        "256": 136
      }
      if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function (obj) {
          return Object.prototype.toString.call(obj) === "[object Array]"
        }
      }
      if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function (obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer
        }
      }
      var createOutputMethod = function (bits2, padding, outputType) {
        return function (message) {
          return new Keccak(bits2, padding, bits2).update(message)[outputType]()
        }
      }
      var createShakeOutputMethod = function (bits2, padding, outputType) {
        return function (message, outputBits) {
          return new Keccak(bits2, padding, outputBits).update(message)[outputType]()
        }
      }
      var createCshakeOutputMethod = function (bits2, padding, outputType) {
        return function (message, outputBits, n, s) {
          return methods["cshake" + bits2].update(message, outputBits, n, s)[outputType]()
        }
      }
      var createKmacOutputMethod = function (bits2, padding, outputType) {
        return function (key, message, outputBits, s) {
          return methods["kmac" + bits2].update(key, message, outputBits, s)[outputType]()
        }
      }
      var createOutputMethods = function (method, createMethod2, bits2, padding) {
        for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
          var type = OUTPUT_TYPES[i2]
          method[type] = createMethod2(bits2, padding, type)
        }
        return method
      }
      var createMethod = function (bits2, padding) {
        var method = createOutputMethod(bits2, padding, "hex")
        method.create = function () {
          return new Keccak(bits2, padding, bits2)
        }
        method.update = function (message) {
          return method.create().update(message)
        }
        return createOutputMethods(method, createOutputMethod, bits2, padding)
      }
      var createShakeMethod = function (bits2, padding) {
        var method = createShakeOutputMethod(bits2, padding, "hex")
        method.create = function (outputBits) {
          return new Keccak(bits2, padding, outputBits)
        }
        method.update = function (message, outputBits) {
          return method.create(outputBits).update(message)
        }
        return createOutputMethods(method, createShakeOutputMethod, bits2, padding)
      }
      var createCshakeMethod = function (bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2]
        var method = createCshakeOutputMethod(bits2, padding, "hex")
        method.create = function (outputBits, n, s) {
          if (!n && !s) {
            return methods["shake" + bits2].create(outputBits)
          } else {
            return new Keccak(bits2, padding, outputBits).bytepad([n, s], w)
          }
        }
        method.update = function (message, outputBits, n, s) {
          return method.create(outputBits, n, s).update(message)
        }
        return createOutputMethods(method, createCshakeOutputMethod, bits2, padding)
      }
      var createKmacMethod = function (bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2]
        var method = createKmacOutputMethod(bits2, padding, "hex")
        method.create = function (key, outputBits, s) {
          return new Kmac(bits2, padding, outputBits).bytepad(["KMAC", s], w).bytepad([key], w)
        }
        method.update = function (key, message, outputBits, s) {
          return method.create(key, outputBits, s).update(message)
        }
        return createOutputMethods(method, createKmacOutputMethod, bits2, padding)
      }
      var algorithms = [
        { name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod },
        { name: "sha3", padding: PADDING, bits: BITS, createMethod },
        { name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
        { name: "cshake", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
        { name: "kmac", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
      ]
      var methods = {}, methodNames = []
      for (var i = 0; i < algorithms.length; ++i) {
        var algorithm = algorithms[i]
        var bits = algorithm.bits
        for (var j = 0; j < bits.length; ++j) {
          var methodName = algorithm.name + "_" + bits[j]
          methodNames.push(methodName)
          methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding)
          if (algorithm.name !== "sha3") {
            var newMethodName = algorithm.name + bits[j]
            methodNames.push(newMethodName)
            methods[newMethodName] = methods[methodName]
          }
        }
      }
      function Keccak(bits2, padding, outputBits) {
        this.blocks = []
        this.s = []
        this.padding = padding
        this.outputBits = outputBits
        this.reset = true
        this.finalized = false
        this.block = 0
        this.start = 0
        this.blockCount = 1600 - (bits2 << 1) >> 5
        this.byteCount = this.blockCount << 2
        this.outputBlocks = outputBits >> 5
        this.extraBytes = (outputBits & 31) >> 3
        for (var i2 = 0; i2 < 50; ++i2) {
          this.s[i2] = 0
        }
      }
      Keccak.prototype.update = function (message) {
        if (this.finalized) {
          throw new Error(FINALIZE_ERROR)
        }
        var notString, type = typeof message
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(INPUT_ERROR)
            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message)
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                throw new Error(INPUT_ERROR)
              }
            }
          } else {
            throw new Error(INPUT_ERROR)
          }
          notString = true
        }
        var blocks = this.blocks, byteCount = this.byteCount, length = message.length, blockCount = this.blockCount, index = 0, s = this.s, i2, code
        while (index < length) {
          if (this.reset) {
            this.reset = false
            blocks[0] = this.block
            for (i2 = 1; i2 < blockCount + 1; ++i2) {
              blocks[i2] = 0
            }
          }
          if (notString) {
            for (i2 = this.start; index < length && i2 < byteCount; ++index) {
              blocks[i2 >> 2] |= message[index] << SHIFT[i2++ & 3]
            }
          } else {
            for (i2 = this.start; index < length && i2 < byteCount; ++index) {
              code = message.charCodeAt(index)
              if (code < 128) {
                blocks[i2 >> 2] |= code << SHIFT[i2++ & 3]
              } else if (code < 2048) {
                blocks[i2 >> 2] |= (192 | code >> 6) << SHIFT[i2++ & 3]
                blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3]
              } else if (code < 55296 || code >= 57344) {
                blocks[i2 >> 2] |= (224 | code >> 12) << SHIFT[i2++ & 3]
                blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3]
                blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3]
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023)
                blocks[i2 >> 2] |= (240 | code >> 18) << SHIFT[i2++ & 3]
                blocks[i2 >> 2] |= (128 | code >> 12 & 63) << SHIFT[i2++ & 3]
                blocks[i2 >> 2] |= (128 | code >> 6 & 63) << SHIFT[i2++ & 3]
                blocks[i2 >> 2] |= (128 | code & 63) << SHIFT[i2++ & 3]
              }
            }
          }
          this.lastByteIndex = i2
          if (i2 >= byteCount) {
            this.start = i2 - byteCount
            this.block = blocks[blockCount]
            for (i2 = 0; i2 < blockCount; ++i2) {
              s[i2] ^= blocks[i2]
            }
            f(s)
            this.reset = true
          } else {
            this.start = i2
          }
        }
        return this
      }
      Keccak.prototype.encode = function (x, right) {
        var o = x & 255, n = 1
        var bytes = [o]
        x = x >> 8
        o = x & 255
        while (o > 0) {
          bytes.unshift(o)
          x = x >> 8
          o = x & 255
          ++n
        }
        if (right) {
          bytes.push(n)
        } else {
          bytes.unshift(n)
        }
        this.update(bytes)
        return bytes.length
      }
      Keccak.prototype.encodeString = function (str) {
        var notString, type = typeof str
        if (type !== "string") {
          if (type === "object") {
            if (str === null) {
              throw new Error(INPUT_ERROR)
            } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
              str = new Uint8Array(str)
            } else if (!Array.isArray(str)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
                throw new Error(INPUT_ERROR)
              }
            }
          } else {
            throw new Error(INPUT_ERROR)
          }
          notString = true
        }
        var bytes = 0, length = str.length
        if (notString) {
          bytes = length
        } else {
          for (var i2 = 0; i2 < str.length; ++i2) {
            var code = str.charCodeAt(i2)
            if (code < 128) {
              bytes += 1
            } else if (code < 2048) {
              bytes += 2
            } else if (code < 55296 || code >= 57344) {
              bytes += 3
            } else {
              code = 65536 + ((code & 1023) << 10 | str.charCodeAt(++i2) & 1023)
              bytes += 4
            }
          }
        }
        bytes += this.encode(bytes * 8)
        this.update(str)
        return bytes
      }
      Keccak.prototype.bytepad = function (strs, w) {
        var bytes = this.encode(w)
        for (var i2 = 0; i2 < strs.length; ++i2) {
          bytes += this.encodeString(strs[i2])
        }
        var paddingBytes = w - bytes % w
        var zeros = []
        zeros.length = paddingBytes
        this.update(zeros)
        return this
      }
      Keccak.prototype.finalize = function () {
        if (this.finalized) {
          return
        }
        this.finalized = true
        var blocks = this.blocks, i2 = this.lastByteIndex, blockCount = this.blockCount, s = this.s
        blocks[i2 >> 2] |= this.padding[i2 & 3]
        if (this.lastByteIndex === this.byteCount) {
          blocks[0] = blocks[blockCount]
          for (i2 = 1; i2 < blockCount + 1; ++i2) {
            blocks[i2] = 0
          }
        }
        blocks[blockCount - 1] |= 2147483648
        for (i2 = 0; i2 < blockCount; ++i2) {
          s[i2] ^= blocks[i2]
        }
        f(s)
      }
      Keccak.prototype.toString = Keccak.prototype.hex = function () {
        this.finalize()
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0
        var hex = "", block
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            block = s[i2]
            hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15]
          }
          if (j2 % blockCount === 0) {
            f(s)
            i2 = 0
          }
        }
        if (extraBytes) {
          block = s[i2]
          hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15]
          if (extraBytes > 1) {
            hex += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15]
          }
          if (extraBytes > 2) {
            hex += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15]
          }
        }
        return hex
      }
      Keccak.prototype.arrayBuffer = function () {
        this.finalize()
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0
        var bytes = this.outputBits >> 3
        var buffer
        if (extraBytes) {
          buffer = new ArrayBuffer(outputBlocks + 1 << 2)
        } else {
          buffer = new ArrayBuffer(bytes)
        }
        var array = new Uint32Array(buffer)
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            array[j2] = s[i2]
          }
          if (j2 % blockCount === 0) {
            f(s)
          }
        }
        if (extraBytes) {
          array[i2] = s[i2]
          buffer = buffer.slice(0, bytes)
        }
        return buffer
      }
      Keccak.prototype.buffer = Keccak.prototype.arrayBuffer
      Keccak.prototype.digest = Keccak.prototype.array = function () {
        this.finalize()
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0
        var array = [], offset, block
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            offset = j2 << 2
            block = s[i2]
            array[offset] = block & 255
            array[offset + 1] = block >> 8 & 255
            array[offset + 2] = block >> 16 & 255
            array[offset + 3] = block >> 24 & 255
          }
          if (j2 % blockCount === 0) {
            f(s)
          }
        }
        if (extraBytes) {
          offset = j2 << 2
          block = s[i2]
          array[offset] = block & 255
          if (extraBytes > 1) {
            array[offset + 1] = block >> 8 & 255
          }
          if (extraBytes > 2) {
            array[offset + 2] = block >> 16 & 255
          }
        }
        return array
      }
      function Kmac(bits2, padding, outputBits) {
        Keccak.call(this, bits2, padding, outputBits)
      }
      Kmac.prototype = new Keccak()
      Kmac.prototype.finalize = function () {
        this.encode(this.outputBits, true)
        return Keccak.prototype.finalize.call(this)
      }
      var f = function (s) {
        var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49
        for (n = 0; n < 48; n += 2) {
          c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40]
          c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41]
          c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42]
          c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43]
          c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44]
          c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45]
          c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46]
          c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47]
          c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48]
          c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49]
          h = c8 ^ (c2 << 1 | c3 >>> 31)
          l = c9 ^ (c3 << 1 | c2 >>> 31)
          s[0] ^= h
          s[1] ^= l
          s[10] ^= h
          s[11] ^= l
          s[20] ^= h
          s[21] ^= l
          s[30] ^= h
          s[31] ^= l
          s[40] ^= h
          s[41] ^= l
          h = c0 ^ (c4 << 1 | c5 >>> 31)
          l = c1 ^ (c5 << 1 | c4 >>> 31)
          s[2] ^= h
          s[3] ^= l
          s[12] ^= h
          s[13] ^= l
          s[22] ^= h
          s[23] ^= l
          s[32] ^= h
          s[33] ^= l
          s[42] ^= h
          s[43] ^= l
          h = c2 ^ (c6 << 1 | c7 >>> 31)
          l = c3 ^ (c7 << 1 | c6 >>> 31)
          s[4] ^= h
          s[5] ^= l
          s[14] ^= h
          s[15] ^= l
          s[24] ^= h
          s[25] ^= l
          s[34] ^= h
          s[35] ^= l
          s[44] ^= h
          s[45] ^= l
          h = c4 ^ (c8 << 1 | c9 >>> 31)
          l = c5 ^ (c9 << 1 | c8 >>> 31)
          s[6] ^= h
          s[7] ^= l
          s[16] ^= h
          s[17] ^= l
          s[26] ^= h
          s[27] ^= l
          s[36] ^= h
          s[37] ^= l
          s[46] ^= h
          s[47] ^= l
          h = c6 ^ (c0 << 1 | c1 >>> 31)
          l = c7 ^ (c1 << 1 | c0 >>> 31)
          s[8] ^= h
          s[9] ^= l
          s[18] ^= h
          s[19] ^= l
          s[28] ^= h
          s[29] ^= l
          s[38] ^= h
          s[39] ^= l
          s[48] ^= h
          s[49] ^= l
          b0 = s[0]
          b1 = s[1]
          b32 = s[11] << 4 | s[10] >>> 28
          b33 = s[10] << 4 | s[11] >>> 28
          b14 = s[20] << 3 | s[21] >>> 29
          b15 = s[21] << 3 | s[20] >>> 29
          b46 = s[31] << 9 | s[30] >>> 23
          b47 = s[30] << 9 | s[31] >>> 23
          b28 = s[40] << 18 | s[41] >>> 14
          b29 = s[41] << 18 | s[40] >>> 14
          b20 = s[2] << 1 | s[3] >>> 31
          b21 = s[3] << 1 | s[2] >>> 31
          b2 = s[13] << 12 | s[12] >>> 20
          b3 = s[12] << 12 | s[13] >>> 20
          b34 = s[22] << 10 | s[23] >>> 22
          b35 = s[23] << 10 | s[22] >>> 22
          b16 = s[33] << 13 | s[32] >>> 19
          b17 = s[32] << 13 | s[33] >>> 19
          b48 = s[42] << 2 | s[43] >>> 30
          b49 = s[43] << 2 | s[42] >>> 30
          b40 = s[5] << 30 | s[4] >>> 2
          b41 = s[4] << 30 | s[5] >>> 2
          b22 = s[14] << 6 | s[15] >>> 26
          b23 = s[15] << 6 | s[14] >>> 26
          b4 = s[25] << 11 | s[24] >>> 21
          b5 = s[24] << 11 | s[25] >>> 21
          b36 = s[34] << 15 | s[35] >>> 17
          b37 = s[35] << 15 | s[34] >>> 17
          b18 = s[45] << 29 | s[44] >>> 3
          b19 = s[44] << 29 | s[45] >>> 3
          b10 = s[6] << 28 | s[7] >>> 4
          b11 = s[7] << 28 | s[6] >>> 4
          b42 = s[17] << 23 | s[16] >>> 9
          b43 = s[16] << 23 | s[17] >>> 9
          b24 = s[26] << 25 | s[27] >>> 7
          b25 = s[27] << 25 | s[26] >>> 7
          b6 = s[36] << 21 | s[37] >>> 11
          b7 = s[37] << 21 | s[36] >>> 11
          b38 = s[47] << 24 | s[46] >>> 8
          b39 = s[46] << 24 | s[47] >>> 8
          b30 = s[8] << 27 | s[9] >>> 5
          b31 = s[9] << 27 | s[8] >>> 5
          b12 = s[18] << 20 | s[19] >>> 12
          b13 = s[19] << 20 | s[18] >>> 12
          b44 = s[29] << 7 | s[28] >>> 25
          b45 = s[28] << 7 | s[29] >>> 25
          b26 = s[38] << 8 | s[39] >>> 24
          b27 = s[39] << 8 | s[38] >>> 24
          b8 = s[48] << 14 | s[49] >>> 18
          b9 = s[49] << 14 | s[48] >>> 18
          s[0] = b0 ^ ~b2 & b4
          s[1] = b1 ^ ~b3 & b5
          s[10] = b10 ^ ~b12 & b14
          s[11] = b11 ^ ~b13 & b15
          s[20] = b20 ^ ~b22 & b24
          s[21] = b21 ^ ~b23 & b25
          s[30] = b30 ^ ~b32 & b34
          s[31] = b31 ^ ~b33 & b35
          s[40] = b40 ^ ~b42 & b44
          s[41] = b41 ^ ~b43 & b45
          s[2] = b2 ^ ~b4 & b6
          s[3] = b3 ^ ~b5 & b7
          s[12] = b12 ^ ~b14 & b16
          s[13] = b13 ^ ~b15 & b17
          s[22] = b22 ^ ~b24 & b26
          s[23] = b23 ^ ~b25 & b27
          s[32] = b32 ^ ~b34 & b36
          s[33] = b33 ^ ~b35 & b37
          s[42] = b42 ^ ~b44 & b46
          s[43] = b43 ^ ~b45 & b47
          s[4] = b4 ^ ~b6 & b8
          s[5] = b5 ^ ~b7 & b9
          s[14] = b14 ^ ~b16 & b18
          s[15] = b15 ^ ~b17 & b19
          s[24] = b24 ^ ~b26 & b28
          s[25] = b25 ^ ~b27 & b29
          s[34] = b34 ^ ~b36 & b38
          s[35] = b35 ^ ~b37 & b39
          s[44] = b44 ^ ~b46 & b48
          s[45] = b45 ^ ~b47 & b49
          s[6] = b6 ^ ~b8 & b0
          s[7] = b7 ^ ~b9 & b1
          s[16] = b16 ^ ~b18 & b10
          s[17] = b17 ^ ~b19 & b11
          s[26] = b26 ^ ~b28 & b20
          s[27] = b27 ^ ~b29 & b21
          s[36] = b36 ^ ~b38 & b30
          s[37] = b37 ^ ~b39 & b31
          s[46] = b46 ^ ~b48 & b40
          s[47] = b47 ^ ~b49 & b41
          s[8] = b8 ^ ~b0 & b2
          s[9] = b9 ^ ~b1 & b3
          s[18] = b18 ^ ~b10 & b12
          s[19] = b19 ^ ~b11 & b13
          s[28] = b28 ^ ~b20 & b22
          s[29] = b29 ^ ~b21 & b23
          s[38] = b38 ^ ~b30 & b32
          s[39] = b39 ^ ~b31 & b33
          s[48] = b48 ^ ~b40 & b42
          s[49] = b49 ^ ~b41 & b43
          s[0] ^= RC[n]
          s[1] ^= RC[n + 1]
        }
      }
      if (COMMON_JS) {
        module.exports = methods
      } else {
        for (i = 0; i < methodNames.length; ++i) {
          root[methodNames[i]] = methods[methodNames[i]]
        }
        if (AMD) {
          define(function () {
            return methods
          })
        }
      }
    })()
  }
})

// src/entities/pool.ts
import { CurrencyAmount, Price as Price2 } from "@uniswap/sdk-core"

// ../../node_modules/jsbi/dist/jsbi.mjs
var JSBI = class _JSBI extends Array {
  constructor(i, _) {
    if (super(i), this.sign = _, i > _JSBI.__kMaxLength) throw new RangeError("Maximum BigInt size exceeded")
  }
  static BigInt(i) {
    var _ = Math.floor, t = Number.isFinite
    if ("number" == typeof i) {
      if (0 === i) return _JSBI.__zero()
      if (_JSBI.__isOneDigitInt(i)) return 0 > i ? _JSBI.__oneDigit(-i, true) : _JSBI.__oneDigit(i, false)
      if (!t(i) || _(i) !== i) throw new RangeError("The number " + i + " cannot be converted to BigInt because it is not an integer")
      return _JSBI.__fromDouble(i)
    }
    if ("string" == typeof i) {
      const _2 = _JSBI.__fromString(i)
      if (null === _2) throw new SyntaxError("Cannot convert " + i + " to a BigInt")
      return _2
    }
    if ("boolean" == typeof i) return true === i ? _JSBI.__oneDigit(1, false) : _JSBI.__zero()
    if ("object" == typeof i) {
      if (i.constructor === _JSBI) return i
      const _2 = _JSBI.__toPrimitive(i)
      return _JSBI.BigInt(_2)
    }
    throw new TypeError("Cannot convert " + i + " to a BigInt")
  }
  toDebugString() {
    const i = ["BigInt["]
    for (const _ of this) i.push((_ ? (_ >>> 0).toString(16) : _) + ", ")
    return i.push("]"), i.join("")
  }
  toString(i = 10) {
    if (2 > i || 36 < i) throw new RangeError("toString() radix argument must be between 2 and 36")
    return 0 === this.length ? "0" : 0 == (i & i - 1) ? _JSBI.__toStringBasePowerOfTwo(this, i) : _JSBI.__toStringGeneric(this, i, false)
  }
  static toNumber(i) {
    const _ = i.length
    if (0 === _) return 0
    if (1 === _) {
      const _2 = i.__unsignedDigit(0)
      return i.sign ? -_2 : _2
    }
    const t = i.__digit(_ - 1), e = _JSBI.__clz30(t), n = 30 * _ - e
    if (1024 < n) return i.sign ? -Infinity : 1 / 0
    let g = n - 1, o = t, s = _ - 1
    const l = e + 3
    let r = 32 === l ? 0 : o << l
    r >>>= 12
    const a = l - 12
    let u = 12 <= l ? 0 : o << 20 + l, d = 20 + l
    for (0 < a && 0 < s && (s--, o = i.__digit(s), r |= o >>> 30 - a, u = o << a + 2, d = a + 2); 0 < d && 0 < s;) s--, o = i.__digit(s), u |= 30 <= d ? o << d - 30 : o >>> 30 - d, d -= 30
    const h = _JSBI.__decideRounding(i, d, s, o)
    if ((1 === h || 0 === h && 1 == (1 & u)) && (u = u + 1 >>> 0, 0 === u && (r++, 0 != r >>> 20 && (r = 0, g++, 1023 < g)))) return i.sign ? -Infinity : 1 / 0
    const m = i.sign ? -2147483648 : 0
    return g = g + 1023 << 20, _JSBI.__kBitConversionInts[1] = m | g | r, _JSBI.__kBitConversionInts[0] = u, _JSBI.__kBitConversionDouble[0]
  }
  static unaryMinus(i) {
    if (0 === i.length) return i
    const _ = i.__copy()
    return _.sign = !i.sign, _
  }
  static bitwiseNot(i) {
    return i.sign ? _JSBI.__absoluteSubOne(i).__trim() : _JSBI.__absoluteAddOne(i, true)
  }
  static exponentiate(i, _) {
    if (_.sign) throw new RangeError("Exponent must be positive")
    if (0 === _.length) return _JSBI.__oneDigit(1, false)
    if (0 === i.length) return i
    if (1 === i.length && 1 === i.__digit(0)) return i.sign && 0 == (1 & _.__digit(0)) ? _JSBI.unaryMinus(i) : i
    if (1 < _.length) throw new RangeError("BigInt too big")
    let t = _.__unsignedDigit(0)
    if (1 === t) return i
    if (t >= _JSBI.__kMaxLengthBits) throw new RangeError("BigInt too big")
    if (1 === i.length && 2 === i.__digit(0)) {
      const _2 = 1 + (0 | t / 30), e2 = i.sign && 0 != (1 & t), n2 = new _JSBI(_2, e2)
      n2.__initializeDigits()
      const g = 1 << t % 30
      return n2.__setDigit(_2 - 1, g), n2
    }
    let e = null, n = i
    for (0 != (1 & t) && (e = i), t >>= 1; 0 !== t; t >>= 1) n = _JSBI.multiply(n, n), 0 != (1 & t) && (null === e ? e = n : e = _JSBI.multiply(e, n))
    return e
  }
  static multiply(_, t) {
    if (0 === _.length) return _
    if (0 === t.length) return t
    let i = _.length + t.length
    30 <= _.__clzmsd() + t.__clzmsd() && i--
    const e = new _JSBI(i, _.sign !== t.sign)
    e.__initializeDigits()
    for (let n = 0; n < _.length; n++) _JSBI.__multiplyAccumulate(t, _.__digit(n), e, n)
    return e.__trim()
  }
  static divide(i, _) {
    if (0 === _.length) throw new RangeError("Division by zero")
    if (0 > _JSBI.__absoluteCompare(i, _)) return _JSBI.__zero()
    const t = i.sign !== _.sign, e = _.__unsignedDigit(0)
    let n
    if (1 === _.length && 32767 >= e) {
      if (1 === e) return t === i.sign ? i : _JSBI.unaryMinus(i)
      n = _JSBI.__absoluteDivSmall(i, e, null)
    } else n = _JSBI.__absoluteDivLarge(i, _, true, false)
    return n.sign = t, n.__trim()
  }
  static remainder(i, _) {
    if (0 === _.length) throw new RangeError("Division by zero")
    if (0 > _JSBI.__absoluteCompare(i, _)) return i
    const t = _.__unsignedDigit(0)
    if (1 === _.length && 32767 >= t) {
      if (1 === t) return _JSBI.__zero()
      const _2 = _JSBI.__absoluteModSmall(i, t)
      return 0 === _2 ? _JSBI.__zero() : _JSBI.__oneDigit(_2, i.sign)
    }
    const e = _JSBI.__absoluteDivLarge(i, _, false, true)
    return e.sign = i.sign, e.__trim()
  }
  static add(i, _) {
    const t = i.sign
    return t === _.sign ? _JSBI.__absoluteAdd(i, _, t) : 0 <= _JSBI.__absoluteCompare(i, _) ? _JSBI.__absoluteSub(i, _, t) : _JSBI.__absoluteSub(_, i, !t)
  }
  static subtract(i, _) {
    const t = i.sign
    return t === _.sign ? 0 <= _JSBI.__absoluteCompare(i, _) ? _JSBI.__absoluteSub(i, _, t) : _JSBI.__absoluteSub(_, i, !t) : _JSBI.__absoluteAdd(i, _, t)
  }
  static leftShift(i, _) {
    return 0 === _.length || 0 === i.length ? i : _.sign ? _JSBI.__rightShiftByAbsolute(i, _) : _JSBI.__leftShiftByAbsolute(i, _)
  }
  static signedRightShift(i, _) {
    return 0 === _.length || 0 === i.length ? i : _.sign ? _JSBI.__leftShiftByAbsolute(i, _) : _JSBI.__rightShiftByAbsolute(i, _)
  }
  static unsignedRightShift() {
    throw new TypeError("BigInts have no unsigned right shift; use >> instead")
  }
  static lessThan(i, _) {
    return 0 > _JSBI.__compareToBigInt(i, _)
  }
  static lessThanOrEqual(i, _) {
    return 0 >= _JSBI.__compareToBigInt(i, _)
  }
  static greaterThan(i, _) {
    return 0 < _JSBI.__compareToBigInt(i, _)
  }
  static greaterThanOrEqual(i, _) {
    return 0 <= _JSBI.__compareToBigInt(i, _)
  }
  static equal(_, t) {
    if (_.sign !== t.sign) return false
    if (_.length !== t.length) return false
    for (let e = 0; e < _.length; e++) if (_.__digit(e) !== t.__digit(e)) return false
    return true
  }
  static notEqual(i, _) {
    return !_JSBI.equal(i, _)
  }
  static bitwiseAnd(i, _) {
    var t = Math.max
    if (!i.sign && !_.sign) return _JSBI.__absoluteAnd(i, _).__trim()
    if (i.sign && _.sign) {
      const e = t(i.length, _.length) + 1
      let n = _JSBI.__absoluteSubOne(i, e)
      const g = _JSBI.__absoluteSubOne(_)
      return n = _JSBI.__absoluteOr(n, g, n), _JSBI.__absoluteAddOne(n, true, n).__trim()
    }
    return i.sign && ([i, _] = [_, i]), _JSBI.__absoluteAndNot(i, _JSBI.__absoluteSubOne(_)).__trim()
  }
  static bitwiseXor(i, _) {
    var t = Math.max
    if (!i.sign && !_.sign) return _JSBI.__absoluteXor(i, _).__trim()
    if (i.sign && _.sign) {
      const e2 = t(i.length, _.length), n2 = _JSBI.__absoluteSubOne(i, e2), g = _JSBI.__absoluteSubOne(_)
      return _JSBI.__absoluteXor(n2, g, n2).__trim()
    }
    const e = t(i.length, _.length) + 1
    i.sign && ([i, _] = [_, i])
    let n = _JSBI.__absoluteSubOne(_, e)
    return n = _JSBI.__absoluteXor(n, i, n), _JSBI.__absoluteAddOne(n, true, n).__trim()
  }
  static bitwiseOr(i, _) {
    var t = Math.max
    const e = t(i.length, _.length)
    if (!i.sign && !_.sign) return _JSBI.__absoluteOr(i, _).__trim()
    if (i.sign && _.sign) {
      let t2 = _JSBI.__absoluteSubOne(i, e)
      const n2 = _JSBI.__absoluteSubOne(_)
      return t2 = _JSBI.__absoluteAnd(t2, n2, t2), _JSBI.__absoluteAddOne(t2, true, t2).__trim()
    }
    i.sign && ([i, _] = [_, i])
    let n = _JSBI.__absoluteSubOne(_, e)
    return n = _JSBI.__absoluteAndNot(n, i, n), _JSBI.__absoluteAddOne(n, true, n).__trim()
  }
  static asIntN(_, t) {
    var i = Math.floor
    if (0 === t.length) return t
    if (_ = i(_), 0 > _) throw new RangeError("Invalid value: not (convertible to) a safe integer")
    if (0 === _) return _JSBI.__zero()
    if (_ >= _JSBI.__kMaxLengthBits) return t
    const e = 0 | (_ + 29) / 30
    if (t.length < e) return t
    const g = t.__unsignedDigit(e - 1), o = 1 << (_ - 1) % 30
    if (t.length === e && g < o) return t
    if (!((g & o) === o)) return _JSBI.__truncateToNBits(_, t)
    if (!t.sign) return _JSBI.__truncateAndSubFromPowerOfTwo(_, t, true)
    if (0 == (g & o - 1)) {
      for (let n = e - 2; 0 <= n; n--) if (0 !== t.__digit(n)) return _JSBI.__truncateAndSubFromPowerOfTwo(_, t, false)
      return t.length === e && g === o ? t : _JSBI.__truncateToNBits(_, t)
    }
    return _JSBI.__truncateAndSubFromPowerOfTwo(_, t, false)
  }
  static asUintN(i, _) {
    var t = Math.floor
    if (0 === _.length) return _
    if (i = t(i), 0 > i) throw new RangeError("Invalid value: not (convertible to) a safe integer")
    if (0 === i) return _JSBI.__zero()
    if (_.sign) {
      if (i > _JSBI.__kMaxLengthBits) throw new RangeError("BigInt too big")
      return _JSBI.__truncateAndSubFromPowerOfTwo(i, _, false)
    }
    if (i >= _JSBI.__kMaxLengthBits) return _
    const e = 0 | (i + 29) / 30
    if (_.length < e) return _
    const g = i % 30
    if (_.length == e) {
      if (0 === g) return _
      const i2 = _.__digit(e - 1)
      if (0 == i2 >>> g) return _
    }
    return _JSBI.__truncateToNBits(i, _)
  }
  static ADD(i, _) {
    if (i = _JSBI.__toPrimitive(i), _ = _JSBI.__toPrimitive(_), "string" == typeof i) return "string" != typeof _ && (_ = _.toString()), i + _
    if ("string" == typeof _) return i.toString() + _
    if (i = _JSBI.__toNumeric(i), _ = _JSBI.__toNumeric(_), _JSBI.__isBigInt(i) && _JSBI.__isBigInt(_)) return _JSBI.add(i, _)
    if ("number" == typeof i && "number" == typeof _) return i + _
    throw new TypeError("Cannot mix BigInt and other types, use explicit conversions")
  }
  static LT(i, _) {
    return _JSBI.__compare(i, _, 0)
  }
  static LE(i, _) {
    return _JSBI.__compare(i, _, 1)
  }
  static GT(i, _) {
    return _JSBI.__compare(i, _, 2)
  }
  static GE(i, _) {
    return _JSBI.__compare(i, _, 3)
  }
  static EQ(i, _) {
    for (; ;) {
      if (_JSBI.__isBigInt(i)) return _JSBI.__isBigInt(_) ? _JSBI.equal(i, _) : _JSBI.EQ(_, i)
      if ("number" == typeof i) {
        if (_JSBI.__isBigInt(_)) return _JSBI.__equalToNumber(_, i)
        if ("object" != typeof _) return i == _
        _ = _JSBI.__toPrimitive(_)
      } else if ("string" == typeof i) {
        if (_JSBI.__isBigInt(_)) return i = _JSBI.__fromString(i), null !== i && _JSBI.equal(i, _)
        if ("object" != typeof _) return i == _
        _ = _JSBI.__toPrimitive(_)
      } else if ("boolean" == typeof i) {
        if (_JSBI.__isBigInt(_)) return _JSBI.__equalToNumber(_, +i)
        if ("object" != typeof _) return i == _
        _ = _JSBI.__toPrimitive(_)
      } else if ("symbol" == typeof i) {
        if (_JSBI.__isBigInt(_)) return false
        if ("object" != typeof _) return i == _
        _ = _JSBI.__toPrimitive(_)
      } else if ("object" == typeof i) {
        if ("object" == typeof _ && _.constructor !== _JSBI) return i == _
        i = _JSBI.__toPrimitive(i)
      } else return i == _
    }
  }
  static NE(i, _) {
    return !_JSBI.EQ(i, _)
  }
  static __zero() {
    return new _JSBI(0, false)
  }
  static __oneDigit(i, _) {
    const t = new _JSBI(1, _)
    return t.__setDigit(0, i), t
  }
  __copy() {
    const _ = new _JSBI(this.length, this.sign)
    for (let t = 0; t < this.length; t++) _[t] = this[t]
    return _
  }
  __trim() {
    let i = this.length, _ = this[i - 1]
    for (; 0 === _;) i--, _ = this[i - 1], this.pop()
    return 0 === i && (this.sign = false), this
  }
  __initializeDigits() {
    for (let _ = 0; _ < this.length; _++) this[_] = 0
  }
  static __decideRounding(i, _, t, e) {
    if (0 < _) return -1
    let n
    if (0 > _) n = -_ - 1
    else {
      if (0 === t) return -1
      t--, e = i.__digit(t), n = 29
    }
    let g = 1 << n
    if (0 == (e & g)) return -1
    if (g -= 1, 0 != (e & g)) return 1
    for (; 0 < t;) if (t--, 0 !== i.__digit(t)) return 1
    return 0
  }
  static __fromDouble(i) {
    _JSBI.__kBitConversionDouble[0] = i
    const _ = 2047 & _JSBI.__kBitConversionInts[1] >>> 20, t = _ - 1023, e = (0 | t / 30) + 1, n = new _JSBI(e, 0 > i)
    let g = 1048575 & _JSBI.__kBitConversionInts[1] | 1048576, o = _JSBI.__kBitConversionInts[0]
    const s = 20, l = t % 30
    let r, a = 0
    if (l < 20) {
      const i2 = s - l
      a = i2 + 32, r = g >>> i2, g = g << 32 - i2 | o >>> i2, o <<= 32 - i2
    } else if (l === 20) a = 32, r = g, g = o, o = 0
    else {
      const i2 = l - s
      a = 32 - i2, r = g << i2 | o >>> 32 - i2, g = o << i2, o = 0
    }
    n.__setDigit(e - 1, r)
    for (let _2 = e - 2; 0 <= _2; _2--) 0 < a ? (a -= 30, r = g >>> 2, g = g << 30 | o >>> 2, o <<= 30) : r = 0, n.__setDigit(_2, r)
    return n.__trim()
  }
  static __isWhitespace(i) {
    return !!(13 >= i && 9 <= i) || (159 >= i ? 32 == i : 131071 >= i ? 160 == i || 5760 == i : 196607 >= i ? (i &= 131071, 10 >= i || 40 == i || 41 == i || 47 == i || 95 == i || 4096 == i) : 65279 == i)
  }
  static __fromString(i, _ = 0) {
    let t = 0
    const e = i.length
    let n = 0
    if (n === e) return _JSBI.__zero()
    let g = i.charCodeAt(n)
    for (; _JSBI.__isWhitespace(g);) {
      if (++n === e) return _JSBI.__zero()
      g = i.charCodeAt(n)
    }
    if (43 === g) {
      if (++n === e) return null
      g = i.charCodeAt(n), t = 1
    } else if (45 === g) {
      if (++n === e) return null
      g = i.charCodeAt(n), t = -1
    }
    if (0 === _) {
      if (_ = 10, 48 === g) {
        if (++n === e) return _JSBI.__zero()
        if (g = i.charCodeAt(n), 88 === g || 120 === g) {
          if (_ = 16, ++n === e) return null
          g = i.charCodeAt(n)
        } else if (79 === g || 111 === g) {
          if (_ = 8, ++n === e) return null
          g = i.charCodeAt(n)
        } else if (66 === g || 98 === g) {
          if (_ = 2, ++n === e) return null
          g = i.charCodeAt(n)
        }
      }
    } else if (16 === _ && 48 === g) {
      if (++n === e) return _JSBI.__zero()
      if (g = i.charCodeAt(n), 88 === g || 120 === g) {
        if (++n === e) return null
        g = i.charCodeAt(n)
      }
    }
    if (0 != t && 10 !== _) return null
    for (; 48 === g;) {
      if (++n === e) return _JSBI.__zero()
      g = i.charCodeAt(n)
    }
    const o = e - n
    let s = _JSBI.__kMaxBitsPerChar[_], l = _JSBI.__kBitsPerCharTableMultiplier - 1
    if (o > 1073741824 / s) return null
    const r = s * o + l >>> _JSBI.__kBitsPerCharTableShift, a = new _JSBI(0 | (r + 29) / 30, false), u = 10 > _ ? _ : 10, h = 10 < _ ? _ - 10 : 0
    if (0 == (_ & _ - 1)) {
      s >>= _JSBI.__kBitsPerCharTableShift
      const _2 = [], t2 = []
      let o2 = false
      do {
        let l2 = 0, r2 = 0
        for (; ;) {
          let _3
          if (g - 48 >>> 0 < u) _3 = g - 48
          else if ((32 | g) - 97 >>> 0 < h) _3 = (32 | g) - 87
          else {
            o2 = true
            break
          }
          if (r2 += s, l2 = l2 << s | _3, ++n === e) {
            o2 = true
            break
          }
          if (g = i.charCodeAt(n), 30 < r2 + s) break
        }
        _2.push(l2), t2.push(r2)
      } while (!o2)
      _JSBI.__fillFromParts(a, _2, t2)
    } else {
      a.__initializeDigits()
      let t2 = false, o2 = 0
      do {
        let r2 = 0, b = 1
        for (; ;) {
          let s2
          if (g - 48 >>> 0 < u) s2 = g - 48
          else if ((32 | g) - 97 >>> 0 < h) s2 = (32 | g) - 87
          else {
            t2 = true
            break
          }
          const l2 = b * _
          if (1073741823 < l2) break
          if (b = l2, r2 = r2 * _ + s2, o2++, ++n === e) {
            t2 = true
            break
          }
          g = i.charCodeAt(n)
        }
        l = 30 * _JSBI.__kBitsPerCharTableMultiplier - 1
        const D = 0 | (s * o2 + l >>> _JSBI.__kBitsPerCharTableShift) / 30
        a.__inplaceMultiplyAdd(b, r2, D)
      } while (!t2)
    }
    if (n !== e) {
      if (!_JSBI.__isWhitespace(g)) return null
      for (n++; n < e; n++) if (g = i.charCodeAt(n), !_JSBI.__isWhitespace(g)) return null
    }
    return a.sign = -1 == t, a.__trim()
  }
  static __fillFromParts(_, t, e) {
    let n = 0, g = 0, o = 0
    for (let s = t.length - 1; 0 <= s; s--) {
      const i = t[s], l = e[s]
      g |= i << o, o += l, 30 === o ? (_.__setDigit(n++, g), o = 0, g = 0) : 30 < o && (_.__setDigit(n++, 1073741823 & g), o -= 30, g = i >>> l - o)
    }
    if (0 !== g) {
      if (n >= _.length) throw new Error("implementation bug")
      _.__setDigit(n++, g)
    }
    for (; n < _.length; n++) _.__setDigit(n, 0)
  }
  static __toStringBasePowerOfTwo(_, i) {
    const t = _.length
    let e = i - 1
    e = (85 & e >>> 1) + (85 & e), e = (51 & e >>> 2) + (51 & e), e = (15 & e >>> 4) + (15 & e)
    const n = e, g = i - 1, o = _.__digit(t - 1), s = _JSBI.__clz30(o)
    let l = 0 | (30 * t - s + n - 1) / n
    if (_.sign && l++, 268435456 < l) throw new Error("string too long")
    const r = Array(l)
    let a = l - 1, u = 0, d = 0
    for (let e2 = 0; e2 < t - 1; e2++) {
      const i2 = _.__digit(e2), t2 = (u | i2 << d) & g
      r[a--] = _JSBI.__kConversionChars[t2]
      const o2 = n - d
      for (u = i2 >>> o2, d = 30 - o2; d >= n;) r[a--] = _JSBI.__kConversionChars[u & g], u >>>= n, d -= n
    }
    const h = (u | o << d) & g
    for (r[a--] = _JSBI.__kConversionChars[h], u = o >>> n - d; 0 !== u;) r[a--] = _JSBI.__kConversionChars[u & g], u >>>= n
    if (_.sign && (r[a--] = "-"), -1 != a) throw new Error("implementation bug")
    return r.join("")
  }
  static __toStringGeneric(_, i, t) {
    const e = _.length
    if (0 === e) return ""
    if (1 === e) {
      let e2 = _.__unsignedDigit(0).toString(i)
      return false === t && _.sign && (e2 = "-" + e2), e2
    }
    const n = 30 * e - _JSBI.__clz30(_.__digit(e - 1)), g = _JSBI.__kMaxBitsPerChar[i], o = g - 1
    let s = n * _JSBI.__kBitsPerCharTableMultiplier
    s += o - 1, s = 0 | s / o
    const l = s + 1 >> 1, r = _JSBI.exponentiate(_JSBI.__oneDigit(i, false), _JSBI.__oneDigit(l, false))
    let a, u
    const d = r.__unsignedDigit(0)
    if (1 === r.length && 32767 >= d) {
      a = new _JSBI(_.length, false), a.__initializeDigits()
      let t2 = 0
      for (let e2 = 2 * _.length - 1; 0 <= e2; e2--) {
        const i2 = t2 << 15 | _.__halfDigit(e2)
        a.__setHalfDigit(e2, 0 | i2 / d), t2 = 0 | i2 % d
      }
      u = t2.toString(i)
    } else {
      const t2 = _JSBI.__absoluteDivLarge(_, r, true, true)
      a = t2.quotient
      const e2 = t2.remainder.__trim()
      u = _JSBI.__toStringGeneric(e2, i, true)
    }
    a.__trim()
    let h = _JSBI.__toStringGeneric(a, i, true)
    for (; u.length < l;) u = "0" + u
    return false === t && _.sign && (h = "-" + h), h + u
  }
  static __unequalSign(i) {
    return i ? -1 : 1
  }
  static __absoluteGreater(i) {
    return i ? -1 : 1
  }
  static __absoluteLess(i) {
    return i ? 1 : -1
  }
  static __compareToBigInt(i, _) {
    const t = i.sign
    if (t !== _.sign) return _JSBI.__unequalSign(t)
    const e = _JSBI.__absoluteCompare(i, _)
    return 0 < e ? _JSBI.__absoluteGreater(t) : 0 > e ? _JSBI.__absoluteLess(t) : 0
  }
  static __compareToNumber(i, _) {
    if (_JSBI.__isOneDigitInt(_)) {
      const t = i.sign, e = 0 > _
      if (t !== e) return _JSBI.__unequalSign(t)
      if (0 === i.length) {
        if (e) throw new Error("implementation bug")
        return 0 === _ ? 0 : -1
      }
      if (1 < i.length) return _JSBI.__absoluteGreater(t)
      const n = Math.abs(_), g = i.__unsignedDigit(0)
      return g > n ? _JSBI.__absoluteGreater(t) : g < n ? _JSBI.__absoluteLess(t) : 0
    }
    return _JSBI.__compareToDouble(i, _)
  }
  static __compareToDouble(i, _) {
    if (_ !== _) return _
    if (_ === 1 / 0) return -1
    if (_ === -Infinity) return 1
    const t = i.sign
    if (t !== 0 > _) return _JSBI.__unequalSign(t)
    if (0 === _) throw new Error("implementation bug: should be handled elsewhere")
    if (0 === i.length) return -1
    _JSBI.__kBitConversionDouble[0] = _
    const e = 2047 & _JSBI.__kBitConversionInts[1] >>> 20
    if (2047 == e) throw new Error("implementation bug: handled elsewhere")
    const n = e - 1023
    if (0 > n) return _JSBI.__absoluteGreater(t)
    const g = i.length
    let o = i.__digit(g - 1)
    const s = _JSBI.__clz30(o), l = 30 * g - s, r = n + 1
    if (l < r) return _JSBI.__absoluteLess(t)
    if (l > r) return _JSBI.__absoluteGreater(t)
    let a = 1048576 | 1048575 & _JSBI.__kBitConversionInts[1], u = _JSBI.__kBitConversionInts[0]
    const d = 20, h = 29 - s
    if (h !== (0 | (l - 1) % 30)) throw new Error("implementation bug")
    let m, b = 0
    if (20 > h) {
      const i2 = d - h
      b = i2 + 32, m = a >>> i2, a = a << 32 - i2 | u >>> i2, u <<= 32 - i2
    } else if (20 === h) b = 32, m = a, a = u, u = 0
    else {
      const i2 = h - d
      b = 32 - i2, m = a << i2 | u >>> 32 - i2, a = u << i2, u = 0
    }
    if (o >>>= 0, m >>>= 0, o > m) return _JSBI.__absoluteGreater(t)
    if (o < m) return _JSBI.__absoluteLess(t)
    for (let e2 = g - 2; 0 <= e2; e2--) {
      0 < b ? (b -= 30, m = a >>> 2, a = a << 30 | u >>> 2, u <<= 30) : m = 0
      const _2 = i.__unsignedDigit(e2)
      if (_2 > m) return _JSBI.__absoluteGreater(t)
      if (_2 < m) return _JSBI.__absoluteLess(t)
    }
    if (0 !== a || 0 !== u) {
      if (0 === b) throw new Error("implementation bug")
      return _JSBI.__absoluteLess(t)
    }
    return 0
  }
  static __equalToNumber(i, _) {
    var t = Math.abs
    return _JSBI.__isOneDigitInt(_) ? 0 === _ ? 0 === i.length : 1 === i.length && i.sign === 0 > _ && i.__unsignedDigit(0) === t(_) : 0 === _JSBI.__compareToDouble(i, _)
  }
  static __comparisonResultToBool(i, _) {
    return 0 === _ ? 0 > i : 1 === _ ? 0 >= i : 2 === _ ? 0 < i : 3 === _ ? 0 <= i : void 0
  }
  static __compare(i, _, t) {
    if (i = _JSBI.__toPrimitive(i), _ = _JSBI.__toPrimitive(_), "string" == typeof i && "string" == typeof _) switch (t) {
      case 0:
        return i < _
      case 1:
        return i <= _
      case 2:
        return i > _
      case 3:
        return i >= _
    }
    if (_JSBI.__isBigInt(i) && "string" == typeof _) return _ = _JSBI.__fromString(_), null !== _ && _JSBI.__comparisonResultToBool(_JSBI.__compareToBigInt(i, _), t)
    if ("string" == typeof i && _JSBI.__isBigInt(_)) return i = _JSBI.__fromString(i), null !== i && _JSBI.__comparisonResultToBool(_JSBI.__compareToBigInt(i, _), t)
    if (i = _JSBI.__toNumeric(i), _ = _JSBI.__toNumeric(_), _JSBI.__isBigInt(i)) {
      if (_JSBI.__isBigInt(_)) return _JSBI.__comparisonResultToBool(_JSBI.__compareToBigInt(i, _), t)
      if ("number" != typeof _) throw new Error("implementation bug")
      return _JSBI.__comparisonResultToBool(_JSBI.__compareToNumber(i, _), t)
    }
    if ("number" != typeof i) throw new Error("implementation bug")
    if (_JSBI.__isBigInt(_)) return _JSBI.__comparisonResultToBool(_JSBI.__compareToNumber(_, i), 2 ^ t)
    if ("number" != typeof _) throw new Error("implementation bug")
    return 0 === t ? i < _ : 1 === t ? i <= _ : 2 === t ? i > _ : 3 === t ? i >= _ : void 0
  }
  __clzmsd() {
    return _JSBI.__clz30(this.__digit(this.length - 1))
  }
  static __absoluteAdd(_, t, e) {
    if (_.length < t.length) return _JSBI.__absoluteAdd(t, _, e)
    if (0 === _.length) return _
    if (0 === t.length) return _.sign === e ? _ : _JSBI.unaryMinus(_)
    let n = _.length;
    (0 === _.__clzmsd() || t.length === _.length && 0 === t.__clzmsd()) && n++
    const g = new _JSBI(n, e)
    let o = 0, s = 0
    for (; s < t.length; s++) {
      const i = _.__digit(s) + t.__digit(s) + o
      o = i >>> 30, g.__setDigit(s, 1073741823 & i)
    }
    for (; s < _.length; s++) {
      const i = _.__digit(s) + o
      o = i >>> 30, g.__setDigit(s, 1073741823 & i)
    }
    return s < g.length && g.__setDigit(s, o), g.__trim()
  }
  static __absoluteSub(_, t, e) {
    if (0 === _.length) return _
    if (0 === t.length) return _.sign === e ? _ : _JSBI.unaryMinus(_)
    const n = new _JSBI(_.length, e)
    let g = 0, o = 0
    for (; o < t.length; o++) {
      const i = _.__digit(o) - t.__digit(o) - g
      g = 1 & i >>> 30, n.__setDigit(o, 1073741823 & i)
    }
    for (; o < _.length; o++) {
      const i = _.__digit(o) - g
      g = 1 & i >>> 30, n.__setDigit(o, 1073741823 & i)
    }
    return n.__trim()
  }
  static __absoluteAddOne(_, i, t = null) {
    const e = _.length
    null === t ? t = new _JSBI(e, i) : t.sign = i
    let n = 1
    for (let g = 0; g < e; g++) {
      const i2 = _.__digit(g) + n
      n = i2 >>> 30, t.__setDigit(g, 1073741823 & i2)
    }
    return 0 != n && t.__setDigitGrow(e, 1), t
  }
  static __absoluteSubOne(_, t) {
    const e = _.length
    t = t || e
    const n = new _JSBI(t, false)
    let g = 1
    for (let o = 0; o < e; o++) {
      const i = _.__digit(o) - g
      g = 1 & i >>> 30, n.__setDigit(o, 1073741823 & i)
    }
    if (0 != g) throw new Error("implementation bug")
    for (let g2 = e; g2 < t; g2++) n.__setDigit(g2, 0)
    return n
  }
  static __absoluteAnd(_, t, e = null) {
    let n = _.length, g = t.length, o = g
    if (n < g) {
      o = n
      const i = _, e2 = n
      _ = t, n = g, t = i, g = e2
    }
    let s = o
    null === e ? e = new _JSBI(s, false) : s = e.length
    let l = 0
    for (; l < o; l++) e.__setDigit(l, _.__digit(l) & t.__digit(l))
    for (; l < s; l++) e.__setDigit(l, 0)
    return e
  }
  static __absoluteAndNot(_, t, e = null) {
    const n = _.length, g = t.length
    let o = g
    n < g && (o = n)
    let s = n
    null === e ? e = new _JSBI(s, false) : s = e.length
    let l = 0
    for (; l < o; l++) e.__setDigit(l, _.__digit(l) & ~t.__digit(l))
    for (; l < n; l++) e.__setDigit(l, _.__digit(l))
    for (; l < s; l++) e.__setDigit(l, 0)
    return e
  }
  static __absoluteOr(_, t, e = null) {
    let n = _.length, g = t.length, o = g
    if (n < g) {
      o = n
      const i = _, e2 = n
      _ = t, n = g, t = i, g = e2
    }
    let s = n
    null === e ? e = new _JSBI(s, false) : s = e.length
    let l = 0
    for (; l < o; l++) e.__setDigit(l, _.__digit(l) | t.__digit(l))
    for (; l < n; l++) e.__setDigit(l, _.__digit(l))
    for (; l < s; l++) e.__setDigit(l, 0)
    return e
  }
  static __absoluteXor(_, t, e = null) {
    let n = _.length, g = t.length, o = g
    if (n < g) {
      o = n
      const i = _, e2 = n
      _ = t, n = g, t = i, g = e2
    }
    let s = n
    null === e ? e = new _JSBI(s, false) : s = e.length
    let l = 0
    for (; l < o; l++) e.__setDigit(l, _.__digit(l) ^ t.__digit(l))
    for (; l < n; l++) e.__setDigit(l, _.__digit(l))
    for (; l < s; l++) e.__setDigit(l, 0)
    return e
  }
  static __absoluteCompare(_, t) {
    const e = _.length - t.length
    if (0 != e) return e
    let n = _.length - 1
    for (; 0 <= n && _.__digit(n) === t.__digit(n);) n--
    return 0 > n ? 0 : _.__unsignedDigit(n) > t.__unsignedDigit(n) ? 1 : -1
  }
  static __multiplyAccumulate(_, t, e, n) {
    if (0 === t) return
    const g = 32767 & t, o = t >>> 15
    let s = 0, l = 0
    for (let r, a = 0; a < _.length; a++, n++) {
      r = e.__digit(n)
      const i = _.__digit(a), t2 = 32767 & i, u = i >>> 15, d = _JSBI.__imul(t2, g), h = _JSBI.__imul(t2, o), m = _JSBI.__imul(u, g), b = _JSBI.__imul(u, o)
      r += l + d + s, s = r >>> 30, r &= 1073741823, r += ((32767 & h) << 15) + ((32767 & m) << 15), s += r >>> 30, l = b + (h >>> 15) + (m >>> 15), e.__setDigit(n, 1073741823 & r)
    }
    for (; 0 != s || 0 !== l; n++) {
      let i = e.__digit(n)
      i += s + l, l = 0, s = i >>> 30, e.__setDigit(n, 1073741823 & i)
    }
  }
  static __internalMultiplyAdd(_, t, e, g, o) {
    let s = e, l = 0
    for (let n = 0; n < g; n++) {
      const i = _.__digit(n), e2 = _JSBI.__imul(32767 & i, t), g2 = _JSBI.__imul(i >>> 15, t), a = e2 + ((32767 & g2) << 15) + l + s
      s = a >>> 30, l = g2 >>> 15, o.__setDigit(n, 1073741823 & a)
    }
    if (o.length > g) for (o.__setDigit(g++, s + l); g < o.length;) o.__setDigit(g++, 0)
    else if (0 !== s + l) throw new Error("implementation bug")
  }
  __inplaceMultiplyAdd(i, _, t) {
    t > this.length && (t = this.length)
    const e = 32767 & i, n = i >>> 15
    let g = 0, o = _
    for (let s = 0; s < t; s++) {
      const i2 = this.__digit(s), _2 = 32767 & i2, t2 = i2 >>> 15, l = _JSBI.__imul(_2, e), r = _JSBI.__imul(_2, n), a = _JSBI.__imul(t2, e), u = _JSBI.__imul(t2, n)
      let d = o + l + g
      g = d >>> 30, d &= 1073741823, d += ((32767 & r) << 15) + ((32767 & a) << 15), g += d >>> 30, o = u + (r >>> 15) + (a >>> 15), this.__setDigit(s, 1073741823 & d)
    }
    if (0 != g || 0 !== o) throw new Error("implementation bug")
  }
  static __absoluteDivSmall(_, t, e = null) {
    null === e && (e = new _JSBI(_.length, false))
    let n = 0
    for (let g, o = 2 * _.length - 1; 0 <= o; o -= 2) {
      g = (n << 15 | _.__halfDigit(o)) >>> 0
      const i = 0 | g / t
      n = 0 | g % t, g = (n << 15 | _.__halfDigit(o - 1)) >>> 0
      const s = 0 | g / t
      n = 0 | g % t, e.__setDigit(o >>> 1, i << 15 | s)
    }
    return e
  }
  static __absoluteModSmall(_, t) {
    let e = 0
    for (let n = 2 * _.length - 1; 0 <= n; n--) {
      const i = (e << 15 | _.__halfDigit(n)) >>> 0
      e = 0 | i % t
    }
    return e
  }
  static __absoluteDivLarge(i, _, t, e) {
    const g = _.__halfDigitLength(), n = _.length, o = i.__halfDigitLength() - g
    let s = null
    t && (s = new _JSBI(o + 2 >>> 1, false), s.__initializeDigits())
    const l = new _JSBI(g + 2 >>> 1, false)
    l.__initializeDigits()
    const r = _JSBI.__clz15(_.__halfDigit(g - 1))
    0 < r && (_ = _JSBI.__specialLeftShift(_, r, 0))
    const a = _JSBI.__specialLeftShift(i, r, 1), u = _.__halfDigit(g - 1)
    let d = 0
    for (let r2, h = o; 0 <= h; h--) {
      r2 = 32767
      const i2 = a.__halfDigit(h + g)
      if (i2 !== u) {
        const t2 = (i2 << 15 | a.__halfDigit(h + g - 1)) >>> 0
        r2 = 0 | t2 / u
        let e3 = 0 | t2 % u
        const n2 = _.__halfDigit(g - 2), o2 = a.__halfDigit(h + g - 2)
        for (; _JSBI.__imul(r2, n2) >>> 0 > (e3 << 16 | o2) >>> 0 && (r2--, e3 += u, !(32767 < e3)););
      }
      _JSBI.__internalMultiplyAdd(_, r2, 0, n, l)
      let e2 = a.__inplaceSub(l, h, g + 1)
      0 !== e2 && (e2 = a.__inplaceAdd(_, h, g), a.__setHalfDigit(h + g, 32767 & a.__halfDigit(h + g) + e2), r2--), t && (1 & h ? d = r2 << 15 : s.__setDigit(h >>> 1, d | r2))
    }
    if (e) return a.__inplaceRightShift(r), t ? { quotient: s, remainder: a } : a
    if (t) return s
    throw new Error("unreachable")
  }
  static __clz15(i) {
    return _JSBI.__clz30(i) - 15
  }
  __inplaceAdd(_, t, e) {
    let n = 0
    for (let g = 0; g < e; g++) {
      const i = this.__halfDigit(t + g) + _.__halfDigit(g) + n
      n = i >>> 15, this.__setHalfDigit(t + g, 32767 & i)
    }
    return n
  }
  __inplaceSub(_, t, e) {
    let n = 0
    if (1 & t) {
      t >>= 1
      let g = this.__digit(t), o = 32767 & g, s = 0
      for (; s < e - 1 >>> 1; s++) {
        const i2 = _.__digit(s), e2 = (g >>> 15) - (32767 & i2) - n
        n = 1 & e2 >>> 15, this.__setDigit(t + s, (32767 & e2) << 15 | 32767 & o), g = this.__digit(t + s + 1), o = (32767 & g) - (i2 >>> 15) - n, n = 1 & o >>> 15
      }
      const i = _.__digit(s), l = (g >>> 15) - (32767 & i) - n
      n = 1 & l >>> 15, this.__setDigit(t + s, (32767 & l) << 15 | 32767 & o)
      if (t + s + 1 >= this.length) throw new RangeError("out of bounds")
      0 == (1 & e) && (g = this.__digit(t + s + 1), o = (32767 & g) - (i >>> 15) - n, n = 1 & o >>> 15, this.__setDigit(t + _.length, 1073709056 & g | 32767 & o))
    } else {
      t >>= 1
      let g = 0
      for (; g < _.length - 1; g++) {
        const i2 = this.__digit(t + g), e2 = _.__digit(g), o2 = (32767 & i2) - (32767 & e2) - n
        n = 1 & o2 >>> 15
        const s2 = (i2 >>> 15) - (e2 >>> 15) - n
        n = 1 & s2 >>> 15, this.__setDigit(t + g, (32767 & s2) << 15 | 32767 & o2)
      }
      const i = this.__digit(t + g), o = _.__digit(g), s = (32767 & i) - (32767 & o) - n
      n = 1 & s >>> 15
      let l = 0
      0 == (1 & e) && (l = (i >>> 15) - (o >>> 15) - n, n = 1 & l >>> 15), this.__setDigit(t + g, (32767 & l) << 15 | 32767 & s)
    }
    return n
  }
  __inplaceRightShift(_) {
    if (0 === _) return
    let t = this.__digit(0) >>> _
    const e = this.length - 1
    for (let n = 0; n < e; n++) {
      const i = this.__digit(n + 1)
      this.__setDigit(n, 1073741823 & i << 30 - _ | t), t = i >>> _
    }
    this.__setDigit(e, t)
  }
  static __specialLeftShift(_, t, e) {
    const g = _.length, n = new _JSBI(g + e, false)
    if (0 === t) {
      for (let t2 = 0; t2 < g; t2++) n.__setDigit(t2, _.__digit(t2))
      return 0 < e && n.__setDigit(g, 0), n
    }
    let o = 0
    for (let s = 0; s < g; s++) {
      const i = _.__digit(s)
      n.__setDigit(s, 1073741823 & i << t | o), o = i >>> 30 - t
    }
    return 0 < e && n.__setDigit(g, o), n
  }
  static __leftShiftByAbsolute(_, i) {
    const t = _JSBI.__toShiftAmount(i)
    if (0 > t) throw new RangeError("BigInt too big")
    const e = 0 | t / 30, n = t % 30, g = _.length, o = 0 !== n && 0 != _.__digit(g - 1) >>> 30 - n, s = g + e + (o ? 1 : 0), l = new _JSBI(s, _.sign)
    if (0 === n) {
      let t2 = 0
      for (; t2 < e; t2++) l.__setDigit(t2, 0)
      for (; t2 < s; t2++) l.__setDigit(t2, _.__digit(t2 - e))
    } else {
      let t2 = 0
      for (let _2 = 0; _2 < e; _2++) l.__setDigit(_2, 0)
      for (let o2 = 0; o2 < g; o2++) {
        const i2 = _.__digit(o2)
        l.__setDigit(o2 + e, 1073741823 & i2 << n | t2), t2 = i2 >>> 30 - n
      }
      if (o) l.__setDigit(g + e, t2)
      else if (0 !== t2) throw new Error("implementation bug")
    }
    return l.__trim()
  }
  static __rightShiftByAbsolute(_, i) {
    const t = _.length, e = _.sign, n = _JSBI.__toShiftAmount(i)
    if (0 > n) return _JSBI.__rightShiftByMaximum(e)
    const g = 0 | n / 30, o = n % 30
    let s = t - g
    if (0 >= s) return _JSBI.__rightShiftByMaximum(e)
    let l = false
    if (e) {
      if (0 != (_.__digit(g) & (1 << o) - 1)) l = true
      else for (let t2 = 0; t2 < g; t2++) if (0 !== _.__digit(t2)) {
        l = true
        break
      }
    }
    if (l && 0 === o) {
      const i2 = _.__digit(t - 1)
      0 == ~i2 && s++
    }
    let r = new _JSBI(s, e)
    if (0 === o) {
      r.__setDigit(s - 1, 0)
      for (let e2 = g; e2 < t; e2++) r.__setDigit(e2 - g, _.__digit(e2))
    } else {
      let e2 = _.__digit(g) >>> o
      const n2 = t - g - 1
      for (let t2 = 0; t2 < n2; t2++) {
        const i2 = _.__digit(t2 + g + 1)
        r.__setDigit(t2, 1073741823 & i2 << 30 - o | e2), e2 = i2 >>> o
      }
      r.__setDigit(n2, e2)
    }
    return l && (r = _JSBI.__absoluteAddOne(r, true, r)), r.__trim()
  }
  static __rightShiftByMaximum(i) {
    return i ? _JSBI.__oneDigit(1, true) : _JSBI.__zero()
  }
  static __toShiftAmount(i) {
    if (1 < i.length) return -1
    const _ = i.__unsignedDigit(0)
    return _ > _JSBI.__kMaxLengthBits ? -1 : _
  }
  static __toPrimitive(i, _ = "default") {
    if ("object" != typeof i) return i
    if (i.constructor === _JSBI) return i
    if ("undefined" != typeof Symbol && "symbol" == typeof Symbol.toPrimitive) {
      const t2 = i[Symbol.toPrimitive]
      if (t2) {
        const i2 = t2(_)
        if ("object" != typeof i2) return i2
        throw new TypeError("Cannot convert object to primitive value")
      }
    }
    const t = i.valueOf
    if (t) {
      const _2 = t.call(i)
      if ("object" != typeof _2) return _2
    }
    const e = i.toString
    if (e) {
      const _2 = e.call(i)
      if ("object" != typeof _2) return _2
    }
    throw new TypeError("Cannot convert object to primitive value")
  }
  static __toNumeric(i) {
    return _JSBI.__isBigInt(i) ? i : +i
  }
  static __isBigInt(i) {
    return "object" == typeof i && null !== i && i.constructor === _JSBI
  }
  static __truncateToNBits(i, _) {
    const t = 0 | (i + 29) / 30, e = new _JSBI(t, _.sign), n = t - 1
    for (let t2 = 0; t2 < n; t2++) e.__setDigit(t2, _.__digit(t2))
    let g = _.__digit(n)
    if (0 != i % 30) {
      const _2 = 32 - i % 30
      g = g << _2 >>> _2
    }
    return e.__setDigit(n, g), e.__trim()
  }
  static __truncateAndSubFromPowerOfTwo(_, t, e) {
    var n = Math.min
    const g = 0 | (_ + 29) / 30, o = new _JSBI(g, e)
    let s = 0
    const l = g - 1
    let a = 0
    for (const i = n(l, t.length); s < i; s++) {
      const i2 = 0 - t.__digit(s) - a
      a = 1 & i2 >>> 30, o.__setDigit(s, 1073741823 & i2)
    }
    for (; s < l; s++) o.__setDigit(s, 0 | 1073741823 & -a)
    let u = l < t.length ? t.__digit(l) : 0
    const d = _ % 30
    let h
    if (0 == d) h = 0 - u - a, h &= 1073741823
    else {
      const i = 32 - d
      u = u << i >>> i
      const _2 = 1 << 32 - i
      h = _2 - u - a, h &= _2 - 1
    }
    return o.__setDigit(l, h), o.__trim()
  }
  __digit(_) {
    return this[_]
  }
  __unsignedDigit(_) {
    return this[_] >>> 0
  }
  __setDigit(_, i) {
    this[_] = 0 | i
  }
  __setDigitGrow(_, i) {
    this[_] = 0 | i
  }
  __halfDigitLength() {
    const i = this.length
    return 32767 >= this.__unsignedDigit(i - 1) ? 2 * i - 1 : 2 * i
  }
  __halfDigit(_) {
    return 32767 & this[_ >>> 1] >>> 15 * (1 & _)
  }
  __setHalfDigit(_, i) {
    const t = _ >>> 1, e = this.__digit(t), n = 1 & _ ? 32767 & e | i << 15 : 1073709056 & e | 32767 & i
    this.__setDigit(t, n)
  }
  static __digitPow(i, _) {
    let t = 1
    for (; 0 < _;) 1 & _ && (t *= i), _ >>>= 1, i *= i
    return t
  }
  static __isOneDigitInt(i) {
    return (1073741823 & i) === i
  }
}
JSBI.__kMaxLength = 33554432, JSBI.__kMaxLengthBits = JSBI.__kMaxLength << 5, JSBI.__kMaxBitsPerChar = [0, 0, 32, 51, 64, 75, 83, 90, 96, 102, 107, 111, 115, 119, 122, 126, 128, 131, 134, 136, 139, 141, 143, 145, 147, 149, 151, 153, 154, 156, 158, 159, 160, 162, 163, 165, 166], JSBI.__kBitsPerCharTableShift = 5, JSBI.__kBitsPerCharTableMultiplier = 1 << JSBI.__kBitsPerCharTableShift, JSBI.__kConversionChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"], JSBI.__kBitConversionBuffer = new ArrayBuffer(8), JSBI.__kBitConversionDouble = new Float64Array(JSBI.__kBitConversionBuffer), JSBI.__kBitConversionInts = new Int32Array(JSBI.__kBitConversionBuffer), JSBI.__clz30 = Math.clz32 ? function (i) {
  return Math.clz32(i) - 2
} : function (i) {
  return 0 === i ? 30 : 0 | 29 - (0 | Math.log(i >>> 0) / Math.LN2)
}, JSBI.__imul = Math.imul || function (i, _) {
  return 0 | i * _
}
var jsbi_default = JSBI

// src/entities/pool.ts
import invariant8 from "tiny-invariant"

// src/constants.ts
import { ChainId } from "@uniswap/sdk-core"
var FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
var ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"
var POOL_INIT_CODE_HASH = "0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54"
function poolInitCodeHash(chainId) {
  switch (chainId) {
    case ChainId.ZKSYNC:
      return "0x010013f177ea1fcbc4520f9a3ca7cd2d1d77959e05aa66484027cb38e712aeed"
    default:
      return POOL_INIT_CODE_HASH
  }
}
var FeeAmount = /* @__PURE__ */ ((FeeAmount4) => {
  FeeAmount4[FeeAmount4["LOWEST"] = 100] = "LOWEST"
  FeeAmount4[FeeAmount4["LOW_200"] = 200] = "LOW_200"
  FeeAmount4[FeeAmount4["LOW_300"] = 300] = "LOW_300"
  FeeAmount4[FeeAmount4["LOW_400"] = 400] = "LOW_400"
  FeeAmount4[FeeAmount4["LOW"] = 500] = "LOW"
  FeeAmount4[FeeAmount4["MEDIUM"] = 3e3] = "MEDIUM"
  FeeAmount4[FeeAmount4["HIGH"] = 1e4] = "HIGH"
  return FeeAmount4
})(FeeAmount || {})
var TICK_SPACINGS = {
  [100 /* LOWEST */]: 1,
  [200 /* LOW_200 */]: 4,
  [300 /* LOW_300 */]: 6,
  [400 /* LOW_400 */]: 8,
  [500 /* LOW */]: 10,
  [3e3 /* MEDIUM */]: 60,
  [1e4 /* HIGH */]: 200
}

// src/internalConstants.ts
var NEGATIVE_ONE = jsbi_default.BigInt(-1)
var ZERO = jsbi_default.BigInt(0)
var ONE = jsbi_default.BigInt(1)
var Q96 = jsbi_default.exponentiate(jsbi_default.BigInt(2), jsbi_default.BigInt(96))
var Q192 = jsbi_default.exponentiate(Q96, jsbi_default.BigInt(2))

// src/utils/computePoolAddress.ts
import { defaultAbiCoder } from "@ethersproject/abi"

// ../../node_modules/@ethersproject/logger/lib.esm/_version.js
var version = "logger/5.8.0"

// ../../node_modules/@ethersproject/logger/lib.esm/index.js
var _permanentCensorErrors = false
var _censorErrors = false
var LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 }
var _logLevel = LogLevels["default"]
var _globalLogger = null
function _checkNormalize() {
  try {
    const missing = [];
    ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
      try {
        if ("test".normalize(form) !== "test") {
          throw new Error("bad normalize")
        }
        ;
      } catch (error) {
        missing.push(form)
      }
    })
    if (missing.length) {
      throw new Error("missing " + missing.join(", "))
    }
    if (String.fromCharCode(233).normalize("NFD") !== String.fromCharCode(101, 769)) {
      throw new Error("broken implementation")
    }
  } catch (error) {
    return error.message
  }
  return null
}
var _normalizeError = _checkNormalize()
var LogLevel;
(function (LogLevel2) {
  LogLevel2["DEBUG"] = "DEBUG"
  LogLevel2["INFO"] = "INFO"
  LogLevel2["WARNING"] = "WARNING"
  LogLevel2["ERROR"] = "ERROR"
  LogLevel2["OFF"] = "OFF"
})(LogLevel || (LogLevel = {}))
var ErrorCode;
(function (ErrorCode2) {
  ErrorCode2["UNKNOWN_ERROR"] = "UNKNOWN_ERROR"
  ErrorCode2["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED"
  ErrorCode2["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION"
  ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR"
  ErrorCode2["SERVER_ERROR"] = "SERVER_ERROR"
  ErrorCode2["TIMEOUT"] = "TIMEOUT"
  ErrorCode2["BUFFER_OVERRUN"] = "BUFFER_OVERRUN"
  ErrorCode2["NUMERIC_FAULT"] = "NUMERIC_FAULT"
  ErrorCode2["MISSING_NEW"] = "MISSING_NEW"
  ErrorCode2["INVALID_ARGUMENT"] = "INVALID_ARGUMENT"
  ErrorCode2["MISSING_ARGUMENT"] = "MISSING_ARGUMENT"
  ErrorCode2["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT"
  ErrorCode2["CALL_EXCEPTION"] = "CALL_EXCEPTION"
  ErrorCode2["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS"
  ErrorCode2["NONCE_EXPIRED"] = "NONCE_EXPIRED"
  ErrorCode2["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED"
  ErrorCode2["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT"
  ErrorCode2["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED"
  ErrorCode2["ACTION_REJECTED"] = "ACTION_REJECTED"
})(ErrorCode || (ErrorCode = {}))
var HEX = "0123456789abcdef"
var Logger = class _Logger {
  constructor(version5) {
    Object.defineProperty(this, "version", {
      enumerable: true,
      value: version5,
      writable: false
    })
  }
  _log(logLevel, args) {
    const level = logLevel.toLowerCase()
    if (LogLevels[level] == null) {
      this.throwArgumentError("invalid log level name", "logLevel", logLevel)
    }
    if (_logLevel > LogLevels[level]) {
      return
    }
    console.log.apply(console, args)
  }
  debug(...args) {
    this._log(_Logger.levels.DEBUG, args)
  }
  info(...args) {
    this._log(_Logger.levels.INFO, args)
  }
  warn(...args) {
    this._log(_Logger.levels.WARNING, args)
  }
  makeError(message, code, params) {
    if (_censorErrors) {
      return this.makeError("censored error", code, {})
    }
    if (!code) {
      code = _Logger.errors.UNKNOWN_ERROR
    }
    if (!params) {
      params = {}
    }
    const messageDetails = []
    Object.keys(params).forEach((key) => {
      const value = params[key]
      try {
        if (value instanceof Uint8Array) {
          let hex = ""
          for (let i = 0; i < value.length; i++) {
            hex += HEX[value[i] >> 4]
            hex += HEX[value[i] & 15]
          }
          messageDetails.push(key + "=Uint8Array(0x" + hex + ")")
        } else {
          messageDetails.push(key + "=" + JSON.stringify(value))
        }
      } catch (error2) {
        messageDetails.push(key + "=" + JSON.stringify(params[key].toString()))
      }
    })
    messageDetails.push(`code=${code}`)
    messageDetails.push(`version=${this.version}`)
    const reason = message
    let url = ""
    switch (code) {
      case ErrorCode.NUMERIC_FAULT: {
        url = "NUMERIC_FAULT"
        const fault = message
        switch (fault) {
          case "overflow":
          case "underflow":
          case "division-by-zero":
            url += "-" + fault
            break
          case "negative-power":
          case "negative-width":
            url += "-unsupported"
            break
          case "unbound-bitwise-result":
            url += "-unbound-result"
            break
        }
        break
      }
      case ErrorCode.CALL_EXCEPTION:
      case ErrorCode.INSUFFICIENT_FUNDS:
      case ErrorCode.MISSING_NEW:
      case ErrorCode.NONCE_EXPIRED:
      case ErrorCode.REPLACEMENT_UNDERPRICED:
      case ErrorCode.TRANSACTION_REPLACED:
      case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
        url = code
        break
    }
    if (url) {
      message += " [ See: https://links.ethers.org/v5-errors-" + url + " ]"
    }
    if (messageDetails.length) {
      message += " (" + messageDetails.join(", ") + ")"
    }
    const error = new Error(message)
    error.reason = reason
    error.code = code
    Object.keys(params).forEach(function (key) {
      error[key] = params[key]
    })
    return error
  }
  throwError(message, code, params) {
    throw this.makeError(message, code, params)
  }
  throwArgumentError(message, name, value) {
    return this.throwError(message, _Logger.errors.INVALID_ARGUMENT, {
      argument: name,
      value
    })
  }
  assert(condition, message, code, params) {
    if (!!condition) {
      return
    }
    this.throwError(message, code, params)
  }
  assertArgument(condition, message, name, value) {
    if (!!condition) {
      return
    }
    this.throwArgumentError(message, name, value)
  }
  checkNormalize(message) {
    if (message == null) {
      message = "platform missing String.prototype.normalize"
    }
    if (_normalizeError) {
      this.throwError("platform missing String.prototype.normalize", _Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "String.prototype.normalize",
        form: _normalizeError
      })
    }
  }
  checkSafeUint53(value, message) {
    if (typeof value !== "number") {
      return
    }
    if (message == null) {
      message = "value not safe"
    }
    if (value < 0 || value >= 9007199254740991) {
      this.throwError(message, _Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "out-of-safe-range",
        value
      })
    }
    if (value % 1) {
      this.throwError(message, _Logger.errors.NUMERIC_FAULT, {
        operation: "checkSafeInteger",
        fault: "non-integer",
        value
      })
    }
  }
  checkArgumentCount(count, expectedCount, message) {
    if (message) {
      message = ": " + message
    } else {
      message = ""
    }
    if (count < expectedCount) {
      this.throwError("missing argument" + message, _Logger.errors.MISSING_ARGUMENT, {
        count,
        expectedCount
      })
    }
    if (count > expectedCount) {
      this.throwError("too many arguments" + message, _Logger.errors.UNEXPECTED_ARGUMENT, {
        count,
        expectedCount
      })
    }
  }
  checkNew(target, kind) {
    if (target === Object || target == null) {
      this.throwError("missing new", _Logger.errors.MISSING_NEW, { name: kind.name })
    }
  }
  checkAbstract(target, kind) {
    if (target === kind) {
      this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", _Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" })
    } else if (target === Object || target == null) {
      this.throwError("missing new", _Logger.errors.MISSING_NEW, { name: kind.name })
    }
  }
  static globalLogger() {
    if (!_globalLogger) {
      _globalLogger = new _Logger(version)
    }
    return _globalLogger
  }
  static setCensorship(censorship, permanent) {
    if (!censorship && permanent) {
      this.globalLogger().throwError("cannot permanently disable censorship", _Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      })
    }
    if (_permanentCensorErrors) {
      if (!censorship) {
        return
      }
      this.globalLogger().throwError("error censorship permanent", _Logger.errors.UNSUPPORTED_OPERATION, {
        operation: "setCensorship"
      })
    }
    _censorErrors = !!censorship
    _permanentCensorErrors = !!permanent
  }
  static setLogLevel(logLevel) {
    const level = LogLevels[logLevel.toLowerCase()]
    if (level == null) {
      _Logger.globalLogger().warn("invalid log level - " + logLevel)
      return
    }
    _logLevel = level
  }
  static from(version5) {
    return new _Logger(version5)
  }
}
Logger.errors = ErrorCode
Logger.levels = LogLevel

// ../../node_modules/@ethersproject/bytes/lib.esm/_version.js
var version2 = "bytes/5.8.0"

// ../../node_modules/@ethersproject/bytes/lib.esm/index.js
var logger = new Logger(version2)
function isHexable(value) {
  return !!value.toHexString
}
function addSlice(array) {
  if (array.slice) {
    return array
  }
  array.slice = function () {
    const args = Array.prototype.slice.call(arguments)
    return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)))
  }
  return array
}
function isInteger(value) {
  return typeof value === "number" && value == value && value % 1 === 0
}
function isBytes(value) {
  if (value == null) {
    return false
  }
  if (value.constructor === Uint8Array) {
    return true
  }
  if (typeof value === "string") {
    return false
  }
  if (!isInteger(value.length) || value.length < 0) {
    return false
  }
  for (let i = 0; i < value.length; i++) {
    const v = value[i]
    if (!isInteger(v) || v < 0 || v >= 256) {
      return false
    }
  }
  return true
}
function arrayify(value, options) {
  if (!options) {
    options = {}
  }
  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid arrayify value")
    const result = []
    while (value) {
      result.unshift(value & 255)
      value = parseInt(String(value / 256))
    }
    if (result.length === 0) {
      result.push(0)
    }
    return addSlice(new Uint8Array(result))
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value
  }
  if (isHexable(value)) {
    value = value.toHexString()
  }
  if (isHexString(value)) {
    let hex = value.substring(2)
    if (hex.length % 2) {
      if (options.hexPad === "left") {
        hex = "0" + hex
      } else if (options.hexPad === "right") {
        hex += "0"
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value)
      }
    }
    const result = []
    for (let i = 0; i < hex.length; i += 2) {
      result.push(parseInt(hex.substring(i, i + 2), 16))
    }
    return addSlice(new Uint8Array(result))
  }
  if (isBytes(value)) {
    return addSlice(new Uint8Array(value))
  }
  return logger.throwArgumentError("invalid arrayify value", "value", value)
}
function concat(items) {
  const objects = items.map((item) => arrayify(item))
  const length = objects.reduce((accum, item) => accum + item.length, 0)
  const result = new Uint8Array(length)
  objects.reduce((offset, object) => {
    result.set(object, offset)
    return offset + object.length
  }, 0)
  return addSlice(result)
}
function isHexString(value, length) {
  if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false
  }
  if (length && value.length !== 2 + 2 * length) {
    return false
  }
  return true
}
var HexCharacters = "0123456789abcdef"
function hexlify(value, options) {
  if (!options) {
    options = {}
  }
  if (typeof value === "number") {
    logger.checkSafeUint53(value, "invalid hexlify value")
    let hex = ""
    while (value) {
      hex = HexCharacters[value & 15] + hex
      value = Math.floor(value / 16)
    }
    if (hex.length) {
      if (hex.length % 2) {
        hex = "0" + hex
      }
      return "0x" + hex
    }
    return "0x00"
  }
  if (typeof value === "bigint") {
    value = value.toString(16)
    if (value.length % 2) {
      return "0x0" + value
    }
    return "0x" + value
  }
  if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
    value = "0x" + value
  }
  if (isHexable(value)) {
    return value.toHexString()
  }
  if (isHexString(value)) {
    if (value.length % 2) {
      if (options.hexPad === "left") {
        value = "0x0" + value.substring(2)
      } else if (options.hexPad === "right") {
        value += "0"
      } else {
        logger.throwArgumentError("hex data is odd-length", "value", value)
      }
    }
    return value.toLowerCase()
  }
  if (isBytes(value)) {
    let result = "0x"
    for (let i = 0; i < value.length; i++) {
      let v = value[i]
      result += HexCharacters[(v & 240) >> 4] + HexCharacters[v & 15]
    }
    return result
  }
  return logger.throwArgumentError("invalid hexlify value", "value", value)
}
function hexDataLength(data) {
  if (typeof data !== "string") {
    data = hexlify(data)
  } else if (!isHexString(data) || data.length % 2) {
    return null
  }
  return (data.length - 2) / 2
}
function hexDataSlice(data, offset, endOffset) {
  if (typeof data !== "string") {
    data = hexlify(data)
  } else if (!isHexString(data) || data.length % 2) {
    logger.throwArgumentError("invalid hexData", "value", data)
  }
  offset = 2 + 2 * offset
  if (endOffset != null) {
    return "0x" + data.substring(offset, 2 + 2 * endOffset)
  }
  return "0x" + data.substring(offset)
}

// ../../node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
var import_bn = __toESM(require_bn())

// ../../node_modules/@ethersproject/bignumber/lib.esm/_version.js
var version3 = "bignumber/5.8.0"

// ../../node_modules/@ethersproject/bignumber/lib.esm/bignumber.js
var BN = import_bn.default.BN
var logger2 = new Logger(version3)
function _base36To16(value) {
  return new BN(value, 36).toString(16)
}

// ../../node_modules/@ethersproject/address/node_modules/@ethersproject/keccak256/lib.esm/index.js
var import_js_sha3 = __toESM(require_sha3())
function keccak256(data) {
  return "0x" + import_js_sha3.default.keccak_256(arrayify(data))
}

// ../../node_modules/@ethersproject/address/lib.esm/_version.js
var version4 = "address/5.8.0"

// ../../node_modules/@ethersproject/address/lib.esm/index.js
var logger3 = new Logger(version4)
function getChecksumAddress(address) {
  if (!isHexString(address, 20)) {
    logger3.throwArgumentError("invalid address", "address", address)
  }
  address = address.toLowerCase()
  const chars = address.substring(2).split("")
  const expanded = new Uint8Array(40)
  for (let i = 0; i < 40; i++) {
    expanded[i] = chars[i].charCodeAt(0)
  }
  const hashed = arrayify(keccak256(expanded))
  for (let i = 0; i < 40; i += 2) {
    if (hashed[i >> 1] >> 4 >= 8) {
      chars[i] = chars[i].toUpperCase()
    }
    if ((hashed[i >> 1] & 15) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase()
    }
  }
  return "0x" + chars.join("")
}
var MAX_SAFE_INTEGER = 9007199254740991
function log10(x) {
  if (Math.log10) {
    return Math.log10(x)
  }
  return Math.log(x) / Math.LN10
}
var ibanLookup = {}
for (let i = 0; i < 10; i++) {
  ibanLookup[String(i)] = String(i)
}
for (let i = 0; i < 26; i++) {
  ibanLookup[String.fromCharCode(65 + i)] = String(10 + i)
}
var safeDigits = Math.floor(log10(MAX_SAFE_INTEGER))
function ibanChecksum(address) {
  address = address.toUpperCase()
  address = address.substring(4) + address.substring(0, 2) + "00"
  let expanded = address.split("").map((c) => {
    return ibanLookup[c]
  }).join("")
  while (expanded.length >= safeDigits) {
    let block = expanded.substring(0, safeDigits)
    expanded = parseInt(block, 10) % 97 + expanded.substring(block.length)
  }
  let checksum = String(98 - parseInt(expanded, 10) % 97)
  while (checksum.length < 2) {
    checksum = "0" + checksum
  }
  return checksum
}
function getAddress(address) {
  let result = null
  if (typeof address !== "string") {
    logger3.throwArgumentError("invalid address", "address", address)
  }
  if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
    if (address.substring(0, 2) !== "0x") {
      address = "0x" + address
    }
    result = getChecksumAddress(address)
    if (address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) && result !== address) {
      logger3.throwArgumentError("bad address checksum", "address", address)
    }
  } else if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    if (address.substring(2, 4) !== ibanChecksum(address)) {
      logger3.throwArgumentError("bad icap checksum", "address", address)
    }
    result = _base36To16(address.substring(4))
    while (result.length < 40) {
      result = "0" + result
    }
    result = getChecksumAddress("0x" + result)
  } else {
    logger3.throwArgumentError("invalid address", "address", address)
  }
  return result
}
function getCreate2Address(from, salt, initCodeHash) {
  if (hexDataLength(salt) !== 32) {
    logger3.throwArgumentError("salt must be 32 bytes", "salt", salt)
  }
  if (hexDataLength(initCodeHash) !== 32) {
    logger3.throwArgumentError("initCodeHash must be 32 bytes", "initCodeHash", initCodeHash)
  }
  return getAddress(hexDataSlice(keccak256(concat(["0xff", getAddress(from), salt, initCodeHash])), 12))
}

// src/utils/computePoolAddress.ts
import { keccak256 as keccak2562 } from "@ethersproject/solidity"
import { ChainId as ChainId2, computeZksyncCreate2Address } from "@uniswap/sdk-core"
function computePoolAddress({
  factoryAddress,
  tokenA,
  tokenB,
  fee,
  initCodeHashManualOverride,
  chainId
}) {
  const [token0, token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
  const salt = keccak2562(
    ["bytes"],
    [defaultAbiCoder.encode(["address", "address", "uint24"], [token0.address, token1.address, fee])]
  )
  const initCodeHash = initCodeHashManualOverride ?? poolInitCodeHash(chainId)
  switch (chainId) {
    case ChainId2.ZKSYNC:
      return computeZksyncCreate2Address(factoryAddress, initCodeHash, salt)
    default:
      return getCreate2Address(factoryAddress, salt, initCodeHash)
  }
}

// src/utils/fullMath.ts
var FullMath = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static mulDivRoundingUp(a, b, denominator) {
    const product = jsbi_default.multiply(a, b)
    let result = jsbi_default.divide(product, denominator)
    if (jsbi_default.notEqual(jsbi_default.remainder(product, denominator), ZERO)) result = jsbi_default.add(result, ONE)
    return result
  }
}

// src/utils/sqrtPriceMath.ts
import { MaxUint256 } from "@uniswap/sdk-core"
import invariant from "tiny-invariant"
var MaxUint160 = jsbi_default.subtract(jsbi_default.exponentiate(jsbi_default.BigInt(2), jsbi_default.BigInt(160)), ONE)
function multiplyIn256(x, y) {
  const product = jsbi_default.multiply(x, y)
  return jsbi_default.bitwiseAnd(product, MaxUint256)
}
function addIn256(x, y) {
  const sum = jsbi_default.add(x, y)
  return jsbi_default.bitwiseAnd(sum, MaxUint256)
}
var SqrtPriceMath = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static getAmount0Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
    if (jsbi_default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
      ;
      [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96]
    }
    const numerator1 = jsbi_default.leftShift(liquidity, jsbi_default.BigInt(96))
    const numerator2 = jsbi_default.subtract(sqrtRatioBX96, sqrtRatioAX96)
    return roundUp ? FullMath.mulDivRoundingUp(FullMath.mulDivRoundingUp(numerator1, numerator2, sqrtRatioBX96), ONE, sqrtRatioAX96) : jsbi_default.divide(jsbi_default.divide(jsbi_default.multiply(numerator1, numerator2), sqrtRatioBX96), sqrtRatioAX96)
  }
  static getAmount1Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp) {
    if (jsbi_default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
      ;
      [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96]
    }
    return roundUp ? FullMath.mulDivRoundingUp(liquidity, jsbi_default.subtract(sqrtRatioBX96, sqrtRatioAX96), Q96) : jsbi_default.divide(jsbi_default.multiply(liquidity, jsbi_default.subtract(sqrtRatioBX96, sqrtRatioAX96)), Q96)
  }
  static getNextSqrtPriceFromInput(sqrtPX96, liquidity, amountIn, zeroForOne) {
    invariant(jsbi_default.greaterThan(sqrtPX96, ZERO))
    invariant(jsbi_default.greaterThan(liquidity, ZERO))
    return zeroForOne ? this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountIn, true) : this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountIn, true)
  }
  static getNextSqrtPriceFromOutput(sqrtPX96, liquidity, amountOut, zeroForOne) {
    invariant(jsbi_default.greaterThan(sqrtPX96, ZERO))
    invariant(jsbi_default.greaterThan(liquidity, ZERO))
    return zeroForOne ? this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amountOut, false) : this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amountOut, false)
  }
  static getNextSqrtPriceFromAmount0RoundingUp(sqrtPX96, liquidity, amount, add) {
    if (jsbi_default.equal(amount, ZERO)) return sqrtPX96
    const numerator1 = jsbi_default.leftShift(liquidity, jsbi_default.BigInt(96))
    if (add) {
      let product = multiplyIn256(amount, sqrtPX96)
      if (jsbi_default.equal(jsbi_default.divide(product, amount), sqrtPX96)) {
        const denominator = addIn256(numerator1, product)
        if (jsbi_default.greaterThanOrEqual(denominator, numerator1)) {
          return FullMath.mulDivRoundingUp(numerator1, sqrtPX96, denominator)
        }
      }
      return FullMath.mulDivRoundingUp(numerator1, ONE, jsbi_default.add(jsbi_default.divide(numerator1, sqrtPX96), amount))
    } else {
      let product = multiplyIn256(amount, sqrtPX96)
      invariant(jsbi_default.equal(jsbi_default.divide(product, amount), sqrtPX96))
      invariant(jsbi_default.greaterThan(numerator1, product))
      const denominator = jsbi_default.subtract(numerator1, product)
      return FullMath.mulDivRoundingUp(numerator1, sqrtPX96, denominator)
    }
  }
  static getNextSqrtPriceFromAmount1RoundingDown(sqrtPX96, liquidity, amount, add) {
    if (add) {
      const quotient = jsbi_default.lessThanOrEqual(amount, MaxUint160) ? jsbi_default.divide(jsbi_default.leftShift(amount, jsbi_default.BigInt(96)), liquidity) : jsbi_default.divide(jsbi_default.multiply(amount, Q96), liquidity)
      return jsbi_default.add(sqrtPX96, quotient)
    } else {
      const quotient = FullMath.mulDivRoundingUp(amount, Q96, liquidity)
      invariant(jsbi_default.greaterThan(sqrtPX96, quotient))
      return jsbi_default.subtract(sqrtPX96, quotient)
    }
  }
}

// src/utils/swapMath.ts
var MAX_FEE = jsbi_default.exponentiate(jsbi_default.BigInt(10), jsbi_default.BigInt(6))
var SwapMath = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static computeSwapStep(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, amountRemaining, feePips) {
    const returnValues = {}
    feePips = jsbi_default.BigInt(feePips)
    const zeroForOne = jsbi_default.greaterThanOrEqual(sqrtRatioCurrentX96, sqrtRatioTargetX96)
    const exactIn = jsbi_default.greaterThanOrEqual(amountRemaining, ZERO)
    if (exactIn) {
      const amountRemainingLessFee = jsbi_default.divide(
        jsbi_default.multiply(amountRemaining, jsbi_default.subtract(MAX_FEE, feePips)),
        MAX_FEE
      )
      returnValues.amountIn = zeroForOne ? SqrtPriceMath.getAmount0Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, true) : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, true)
      if (jsbi_default.greaterThanOrEqual(amountRemainingLessFee, returnValues.amountIn)) {
        returnValues.sqrtRatioNextX96 = sqrtRatioTargetX96
      } else {
        returnValues.sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromInput(
          sqrtRatioCurrentX96,
          liquidity,
          amountRemainingLessFee,
          zeroForOne
        )
      }
    } else {
      returnValues.amountOut = zeroForOne ? SqrtPriceMath.getAmount1Delta(sqrtRatioTargetX96, sqrtRatioCurrentX96, liquidity, false) : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, sqrtRatioTargetX96, liquidity, false)
      if (jsbi_default.greaterThanOrEqual(jsbi_default.multiply(amountRemaining, NEGATIVE_ONE), returnValues.amountOut)) {
        returnValues.sqrtRatioNextX96 = sqrtRatioTargetX96
      } else {
        returnValues.sqrtRatioNextX96 = SqrtPriceMath.getNextSqrtPriceFromOutput(
          sqrtRatioCurrentX96,
          liquidity,
          jsbi_default.multiply(amountRemaining, NEGATIVE_ONE),
          zeroForOne
        )
      }
    }
    const max = jsbi_default.equal(sqrtRatioTargetX96, returnValues.sqrtRatioNextX96)
    if (zeroForOne) {
      returnValues.amountIn = max && exactIn ? returnValues.amountIn : SqrtPriceMath.getAmount0Delta(returnValues.sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, true)
      returnValues.amountOut = max && !exactIn ? returnValues.amountOut : SqrtPriceMath.getAmount1Delta(returnValues.sqrtRatioNextX96, sqrtRatioCurrentX96, liquidity, false)
    } else {
      returnValues.amountIn = max && exactIn ? returnValues.amountIn : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX96, returnValues.sqrtRatioNextX96, liquidity, true)
      returnValues.amountOut = max && !exactIn ? returnValues.amountOut : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX96, returnValues.sqrtRatioNextX96, liquidity, false)
    }
    if (!exactIn && jsbi_default.greaterThan(returnValues.amountOut, jsbi_default.multiply(amountRemaining, NEGATIVE_ONE))) {
      returnValues.amountOut = jsbi_default.multiply(amountRemaining, NEGATIVE_ONE)
    }
    if (exactIn && jsbi_default.notEqual(returnValues.sqrtRatioNextX96, sqrtRatioTargetX96)) {
      returnValues.feeAmount = jsbi_default.subtract(amountRemaining, returnValues.amountIn)
    } else {
      returnValues.feeAmount = FullMath.mulDivRoundingUp(
        returnValues.amountIn,
        feePips,
        jsbi_default.subtract(MAX_FEE, feePips)
      )
    }
    return [returnValues.sqrtRatioNextX96, returnValues.amountIn, returnValues.amountOut, returnValues.feeAmount]
  }
}

// src/utils/liquidityMath.ts
var LiquidityMath = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static addDelta(x, y) {
    if (jsbi_default.lessThan(y, ZERO)) {
      return jsbi_default.subtract(x, jsbi_default.multiply(y, NEGATIVE_ONE))
    } else {
      return jsbi_default.add(x, y)
    }
  }
}

// src/utils/v3swap.ts
import invariant4 from "tiny-invariant"

// src/utils/tickMath.ts
import { MaxUint256 as MaxUint2563 } from "@uniswap/sdk-core"
import invariant3 from "tiny-invariant"

// src/utils/mostSignificantBit.ts
import { MaxUint256 as MaxUint2562 } from "@uniswap/sdk-core"
import invariant2 from "tiny-invariant"
var TWO = jsbi_default.BigInt(2)
var POWERS_OF_2 = [128, 64, 32, 16, 8, 4, 2, 1].map((pow) => [
  pow,
  jsbi_default.exponentiate(TWO, jsbi_default.BigInt(pow))
])
function mostSignificantBit(x) {
  invariant2(jsbi_default.greaterThan(x, ZERO), "ZERO")
  invariant2(jsbi_default.lessThanOrEqual(x, MaxUint2562), "MAX")
  let msb = 0
  for (const [power, min] of POWERS_OF_2) {
    if (jsbi_default.greaterThanOrEqual(x, min)) {
      x = jsbi_default.signedRightShift(x, jsbi_default.BigInt(power))
      msb += power
    }
  }
  return msb
}

// src/utils/tickMath.ts
function mulShift(val, mulBy) {
  return jsbi_default.signedRightShift(jsbi_default.multiply(val, jsbi_default.BigInt(mulBy)), jsbi_default.BigInt(128))
}
var Q32 = jsbi_default.exponentiate(jsbi_default.BigInt(2), jsbi_default.BigInt(32))
var TickMath = class _TickMath {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  /**
   * The minimum tick that can be used on any pool.
   */
  static MIN_TICK = -887272;
  /**
   * The maximum tick that can be used on any pool.
   */
  static MAX_TICK = -_TickMath.MIN_TICK;
  /**
   * The sqrt ratio corresponding to the minimum tick that could be used on any pool.
   */
  static MIN_SQRT_RATIO = jsbi_default.BigInt("4295128739");
  /**
   * The sqrt ratio corresponding to the maximum tick that could be used on any pool.
   */
  static MAX_SQRT_RATIO = jsbi_default.BigInt("1461446703485210103287273052203988822378723970342");
  /**
   * Returns the sqrt ratio as a Q64.96 for the given tick. The sqrt ratio is computed as sqrt(1.0001)^tick
   * @param tick the tick for which to compute the sqrt ratio
   */
  static getSqrtRatioAtTick(tick) {
    invariant3(tick >= _TickMath.MIN_TICK && tick <= _TickMath.MAX_TICK && Number.isInteger(tick), "TICK")
    const absTick = tick < 0 ? tick * -1 : tick
    let ratio = (absTick & 1) !== 0 ? jsbi_default.BigInt("0xfffcb933bd6fad37aa2d162d1a594001") : jsbi_default.BigInt("0x100000000000000000000000000000000")
    if ((absTick & 2) !== 0) ratio = mulShift(ratio, "0xfff97272373d413259a46990580e213a")
    if ((absTick & 4) !== 0) ratio = mulShift(ratio, "0xfff2e50f5f656932ef12357cf3c7fdcc")
    if ((absTick & 8) !== 0) ratio = mulShift(ratio, "0xffe5caca7e10e4e61c3624eaa0941cd0")
    if ((absTick & 16) !== 0) ratio = mulShift(ratio, "0xffcb9843d60f6159c9db58835c926644")
    if ((absTick & 32) !== 0) ratio = mulShift(ratio, "0xff973b41fa98c081472e6896dfb254c0")
    if ((absTick & 64) !== 0) ratio = mulShift(ratio, "0xff2ea16466c96a3843ec78b326b52861")
    if ((absTick & 128) !== 0) ratio = mulShift(ratio, "0xfe5dee046a99a2a811c461f1969c3053")
    if ((absTick & 256) !== 0) ratio = mulShift(ratio, "0xfcbe86c7900a88aedcffc83b479aa3a4")
    if ((absTick & 512) !== 0) ratio = mulShift(ratio, "0xf987a7253ac413176f2b074cf7815e54")
    if ((absTick & 1024) !== 0) ratio = mulShift(ratio, "0xf3392b0822b70005940c7a398e4b70f3")
    if ((absTick & 2048) !== 0) ratio = mulShift(ratio, "0xe7159475a2c29b7443b29c7fa6e889d9")
    if ((absTick & 4096) !== 0) ratio = mulShift(ratio, "0xd097f3bdfd2022b8845ad8f792aa5825")
    if ((absTick & 8192) !== 0) ratio = mulShift(ratio, "0xa9f746462d870fdf8a65dc1f90e061e5")
    if ((absTick & 16384) !== 0) ratio = mulShift(ratio, "0x70d869a156d2a1b890bb3df62baf32f7")
    if ((absTick & 32768) !== 0) ratio = mulShift(ratio, "0x31be135f97d08fd981231505542fcfa6")
    if ((absTick & 65536) !== 0) ratio = mulShift(ratio, "0x9aa508b5b7a84e1c677de54f3e99bc9")
    if ((absTick & 131072) !== 0) ratio = mulShift(ratio, "0x5d6af8dedb81196699c329225ee604")
    if ((absTick & 262144) !== 0) ratio = mulShift(ratio, "0x2216e584f5fa1ea926041bedfe98")
    if ((absTick & 524288) !== 0) ratio = mulShift(ratio, "0x48a170391f7dc42444e8fa2")
    if (tick > 0) ratio = jsbi_default.divide(MaxUint2563, ratio)
    return jsbi_default.greaterThan(jsbi_default.remainder(ratio, Q32), ZERO) ? jsbi_default.add(jsbi_default.divide(ratio, Q32), ONE) : jsbi_default.divide(ratio, Q32)
  }
  /**
   * Returns the tick corresponding to a given sqrt ratio, s.t. #getSqrtRatioAtTick(tick) <= sqrtRatioX96
   * and #getSqrtRatioAtTick(tick + 1) > sqrtRatioX96
   * @param sqrtRatioX96 the sqrt ratio as a Q64.96 for which to compute the tick
   */
  static getTickAtSqrtRatio(sqrtRatioX96) {
    invariant3(
      jsbi_default.greaterThanOrEqual(sqrtRatioX96, _TickMath.MIN_SQRT_RATIO) && jsbi_default.lessThan(sqrtRatioX96, _TickMath.MAX_SQRT_RATIO),
      "SQRT_RATIO"
    )
    const sqrtRatioX128 = jsbi_default.leftShift(sqrtRatioX96, jsbi_default.BigInt(32))
    const msb = mostSignificantBit(sqrtRatioX128)
    let r
    if (jsbi_default.greaterThanOrEqual(jsbi_default.BigInt(msb), jsbi_default.BigInt(128))) {
      r = jsbi_default.signedRightShift(sqrtRatioX128, jsbi_default.BigInt(msb - 127))
    } else {
      r = jsbi_default.leftShift(sqrtRatioX128, jsbi_default.BigInt(127 - msb))
    }
    let log_2 = jsbi_default.leftShift(jsbi_default.subtract(jsbi_default.BigInt(msb), jsbi_default.BigInt(128)), jsbi_default.BigInt(64))
    for (let i = 0; i < 14; i++) {
      r = jsbi_default.signedRightShift(jsbi_default.multiply(r, r), jsbi_default.BigInt(127))
      const f = jsbi_default.signedRightShift(r, jsbi_default.BigInt(128))
      log_2 = jsbi_default.bitwiseOr(log_2, jsbi_default.leftShift(f, jsbi_default.BigInt(63 - i)))
      r = jsbi_default.signedRightShift(r, f)
    }
    const log_sqrt10001 = jsbi_default.multiply(log_2, jsbi_default.BigInt("255738958999603826347141"))
    const tickLow = jsbi_default.toNumber(
      jsbi_default.signedRightShift(
        jsbi_default.subtract(log_sqrt10001, jsbi_default.BigInt("3402992956809132418596140100660247210")),
        jsbi_default.BigInt(128)
      )
    )
    const tickHigh = jsbi_default.toNumber(
      jsbi_default.signedRightShift(
        jsbi_default.add(log_sqrt10001, jsbi_default.BigInt("291339464771989622907027621153398088495")),
        jsbi_default.BigInt(128)
      )
    )
    return tickLow === tickHigh ? tickLow : jsbi_default.lessThanOrEqual(_TickMath.getSqrtRatioAtTick(tickHigh), sqrtRatioX96) ? tickHigh : tickLow
  }
}

// src/utils/v3swap.ts
async function v3Swap(fee, sqrtRatioX96, tickCurrent, liquidity, tickSpacing, tickDataProvider, zeroForOne, amountSpecified, sqrtPriceLimitX96) {
  if (!sqrtPriceLimitX96)
    sqrtPriceLimitX96 = zeroForOne ? jsbi_default.add(TickMath.MIN_SQRT_RATIO, ONE) : jsbi_default.subtract(TickMath.MAX_SQRT_RATIO, ONE)
  if (zeroForOne) {
    invariant4(jsbi_default.greaterThan(sqrtPriceLimitX96, TickMath.MIN_SQRT_RATIO), "RATIO_MIN")
    invariant4(jsbi_default.lessThan(sqrtPriceLimitX96, sqrtRatioX96), "RATIO_CURRENT")
  } else {
    invariant4(jsbi_default.lessThan(sqrtPriceLimitX96, TickMath.MAX_SQRT_RATIO), "RATIO_MAX")
    invariant4(jsbi_default.greaterThan(sqrtPriceLimitX96, sqrtRatioX96), "RATIO_CURRENT")
  }
  const exactInput = jsbi_default.greaterThanOrEqual(amountSpecified, ZERO)
  const state = {
    amountSpecifiedRemaining: amountSpecified,
    amountCalculated: ZERO,
    sqrtPriceX96: sqrtRatioX96,
    tick: tickCurrent,
    liquidity
  }
  while (jsbi_default.notEqual(state.amountSpecifiedRemaining, ZERO) && state.sqrtPriceX96 !== sqrtPriceLimitX96) {
    let step = {}
    step.sqrtPriceStartX96 = state.sqrtPriceX96;
    [step.tickNext, step.initialized] = await tickDataProvider.nextInitializedTickWithinOneWord(
      state.tick,
      zeroForOne,
      tickSpacing
    )
    if (step.tickNext < TickMath.MIN_TICK) {
      step.tickNext = TickMath.MIN_TICK
    } else if (step.tickNext > TickMath.MAX_TICK) {
      step.tickNext = TickMath.MAX_TICK
    }
    step.sqrtPriceNextX96 = TickMath.getSqrtRatioAtTick(step.tickNext);
    [state.sqrtPriceX96, step.amountIn, step.amountOut, step.feeAmount] = SwapMath.computeSwapStep(
      state.sqrtPriceX96,
      (zeroForOne ? jsbi_default.lessThan(step.sqrtPriceNextX96, sqrtPriceLimitX96) : jsbi_default.greaterThan(step.sqrtPriceNextX96, sqrtPriceLimitX96)) ? sqrtPriceLimitX96 : step.sqrtPriceNextX96,
      state.liquidity,
      state.amountSpecifiedRemaining,
      fee
    )
    if (exactInput) {
      state.amountSpecifiedRemaining = jsbi_default.subtract(
        state.amountSpecifiedRemaining,
        jsbi_default.add(step.amountIn, step.feeAmount)
      )
      state.amountCalculated = jsbi_default.subtract(state.amountCalculated, step.amountOut)
    } else {
      state.amountSpecifiedRemaining = jsbi_default.add(state.amountSpecifiedRemaining, step.amountOut)
      state.amountCalculated = jsbi_default.add(state.amountCalculated, jsbi_default.add(step.amountIn, step.feeAmount))
    }
    if (jsbi_default.equal(state.sqrtPriceX96, step.sqrtPriceNextX96)) {
      if (step.initialized) {
        let liquidityNet = jsbi_default.BigInt((await tickDataProvider.getTick(step.tickNext)).liquidityNet)
        if (zeroForOne) liquidityNet = jsbi_default.multiply(liquidityNet, NEGATIVE_ONE)
        state.liquidity = LiquidityMath.addDelta(state.liquidity, liquidityNet)
      }
      state.tick = zeroForOne ? step.tickNext - 1 : step.tickNext
    } else if (jsbi_default.notEqual(state.sqrtPriceX96, step.sqrtPriceStartX96)) {
      state.tick = TickMath.getTickAtSqrtRatio(state.sqrtPriceX96)
    }
  }
  return {
    amountCalculated: state.amountCalculated,
    sqrtRatioX96: state.sqrtPriceX96,
    liquidity: state.liquidity,
    tickCurrent: state.tick
  }
}

// src/entities/tickDataProvider.ts
var NoTickDataProvider = class _NoTickDataProvider {
  static ERROR_MESSAGE = "No tick data provider was given";
  async getTick(_tick) {
    throw new Error(_NoTickDataProvider.ERROR_MESSAGE)
  }
  async nextInitializedTickWithinOneWord(_tick, _lte, _tickSpacing) {
    throw new Error(_NoTickDataProvider.ERROR_MESSAGE)
  }
}

// src/utils/tickList.ts
import invariant5 from "tiny-invariant"

// src/utils/isSorted.ts
function isSorted(list, comparator) {
  for (let i = 0; i < list.length - 1; i++) {
    if (comparator(list[i], list[i + 1]) > 0) {
      return false
    }
  }
  return true
}

// src/utils/tickList.ts
function tickComparator(a, b) {
  return a.index - b.index
}
var TickList = class _TickList {
  /**
   * Cannot be constructed
   */
  constructor() {
  }
  static validateList(ticks, tickSpacing) {
    invariant5(tickSpacing > 0, "TICK_SPACING_NONZERO")
    invariant5(
      ticks.every(({ index }) => index % tickSpacing === 0),
      "TICK_SPACING"
    )
    invariant5(
      jsbi_default.equal(
        ticks.reduce((accumulator, { liquidityNet }) => jsbi_default.add(accumulator, liquidityNet), ZERO),
        ZERO
      ),
      "ZERO_NET"
    )
    invariant5(isSorted(ticks, tickComparator), "SORTED")
  }
  static isBelowSmallest(ticks, tick) {
    invariant5(ticks.length > 0, "LENGTH")
    return tick < ticks[0].index
  }
  static isAtOrAboveLargest(ticks, tick) {
    invariant5(ticks.length > 0, "LENGTH")
    return tick >= ticks[ticks.length - 1].index
  }
  static getTick(ticks, index) {
    const tick = ticks[this.binarySearch(ticks, index)]
    invariant5(tick.index === index, "NOT_CONTAINED")
    return tick
  }
  /**
   * Finds the largest tick in the list of ticks that is less than or equal to tick
   * @param ticks list of ticks
   * @param tick tick to find the largest tick that is less than or equal to tick
   * @private
   */
  static binarySearch(ticks, tick) {
    invariant5(!this.isBelowSmallest(ticks, tick), "BELOW_SMALLEST")
    let l = 0
    let r = ticks.length - 1
    let i
    while (true) {
      i = Math.floor((l + r) / 2)
      if (ticks[i].index <= tick && (i === ticks.length - 1 || ticks[i + 1].index > tick)) {
        return i
      }
      if (ticks[i].index < tick) {
        l = i + 1
      } else {
        r = i - 1
      }
    }
  }
  static nextInitializedTick(ticks, tick, lte) {
    if (lte) {
      invariant5(!_TickList.isBelowSmallest(ticks, tick), "BELOW_SMALLEST")
      if (_TickList.isAtOrAboveLargest(ticks, tick)) {
        return ticks[ticks.length - 1]
      }
      const index = this.binarySearch(ticks, tick)
      return ticks[index]
    } else {
      invariant5(!this.isAtOrAboveLargest(ticks, tick), "AT_OR_ABOVE_LARGEST")
      if (this.isBelowSmallest(ticks, tick)) {
        return ticks[0]
      }
      const index = this.binarySearch(ticks, tick)
      return ticks[index + 1]
    }
  }
  static nextInitializedTickWithinOneWord(ticks, tick, lte, tickSpacing) {
    const compressed = Math.floor(tick / tickSpacing)
    if (lte) {
      const wordPos = compressed >> 8
      const minimum = (wordPos << 8) * tickSpacing
      if (_TickList.isBelowSmallest(ticks, tick)) {
        return [minimum, false]
      }
      const index = _TickList.nextInitializedTick(ticks, tick, lte).index
      const nextInitializedTick = Math.max(minimum, index)
      return [nextInitializedTick, nextInitializedTick === index]
    } else {
      const wordPos = compressed + 1 >> 8
      const maximum = ((wordPos + 1 << 8) - 1) * tickSpacing
      if (this.isAtOrAboveLargest(ticks, tick)) {
        return [maximum, false]
      }
      const index = this.nextInitializedTick(ticks, tick, lte).index
      const nextInitializedTick = Math.min(maximum, index)
      return [nextInitializedTick, nextInitializedTick === index]
    }
  }
}

// src/entities/tick.ts
import invariant7 from "tiny-invariant"

// src/utils/calldata.ts
function toHex(bigintIsh) {
  const bigInt = jsbi_default.BigInt(bigintIsh)
  let hex = bigInt.toString(16)
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`
  }
  return `0x${hex}`
}

// src/utils/encodeRouteToPath.ts
import { pack } from "@ethersproject/solidity"
function encodeRouteToPath(route, exactOutput) {
  const firstInputToken = route.input.wrapped
  const { path, types } = route.pools.reduce(
    ({ inputToken, path: path2, types: types2 }, pool, index) => {
      const outputToken = pool.token0.equals(inputToken) ? pool.token1 : pool.token0
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ["address", "uint24", "address"],
          path: [inputToken.address, pool.fee, outputToken.address]
        }
      } else {
        return {
          inputToken: outputToken,
          types: [...types2, "uint24", "address"],
          path: [...path2, pool.fee, outputToken.address]
        }
      }
    },
    { inputToken: firstInputToken, path: [], types: [] }
  )
  return exactOutput ? pack(types.reverse(), path.reverse()) : pack(types, path)
}

// src/utils/encodeSqrtRatioX96.ts
import { sqrt } from "@uniswap/sdk-core"
function encodeSqrtRatioX96(amount1, amount0) {
  const numerator = jsbi_default.leftShift(jsbi_default.BigInt(amount1), jsbi_default.BigInt(192))
  const denominator = jsbi_default.BigInt(amount0)
  const ratioX192 = jsbi_default.divide(numerator, denominator)
  return sqrt(ratioX192)
}

// src/utils/maxLiquidityForAmounts.ts
function maxLiquidityForAmount0Imprecise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
  if (jsbi_default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    ;
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96]
  }
  const intermediate = jsbi_default.divide(jsbi_default.multiply(sqrtRatioAX96, sqrtRatioBX96), Q96)
  return jsbi_default.divide(jsbi_default.multiply(jsbi_default.BigInt(amount0), intermediate), jsbi_default.subtract(sqrtRatioBX96, sqrtRatioAX96))
}
function maxLiquidityForAmount0Precise(sqrtRatioAX96, sqrtRatioBX96, amount0) {
  if (jsbi_default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    ;
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96]
  }
  const numerator = jsbi_default.multiply(jsbi_default.multiply(jsbi_default.BigInt(amount0), sqrtRatioAX96), sqrtRatioBX96)
  const denominator = jsbi_default.multiply(Q96, jsbi_default.subtract(sqrtRatioBX96, sqrtRatioAX96))
  return jsbi_default.divide(numerator, denominator)
}
function maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1) {
  if (jsbi_default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    ;
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96]
  }
  return jsbi_default.divide(jsbi_default.multiply(jsbi_default.BigInt(amount1), Q96), jsbi_default.subtract(sqrtRatioBX96, sqrtRatioAX96))
}
function maxLiquidityForAmounts(sqrtRatioCurrentX96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1, useFullPrecision) {
  if (jsbi_default.greaterThan(sqrtRatioAX96, sqrtRatioBX96)) {
    ;
    [sqrtRatioAX96, sqrtRatioBX96] = [sqrtRatioBX96, sqrtRatioAX96]
  }
  const maxLiquidityForAmount0 = useFullPrecision ? maxLiquidityForAmount0Precise : maxLiquidityForAmount0Imprecise
  if (jsbi_default.lessThanOrEqual(sqrtRatioCurrentX96, sqrtRatioAX96)) {
    return maxLiquidityForAmount0(sqrtRatioAX96, sqrtRatioBX96, amount0)
  } else if (jsbi_default.lessThan(sqrtRatioCurrentX96, sqrtRatioBX96)) {
    const liquidity0 = maxLiquidityForAmount0(sqrtRatioCurrentX96, sqrtRatioBX96, amount0)
    const liquidity1 = maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioCurrentX96, amount1)
    return jsbi_default.lessThan(liquidity0, liquidity1) ? liquidity0 : liquidity1
  } else {
    return maxLiquidityForAmount1(sqrtRatioAX96, sqrtRatioBX96, amount1)
  }
}

// src/utils/nearestUsableTick.ts
import invariant6 from "tiny-invariant"
function nearestUsableTick(tick, tickSpacing) {
  invariant6(Number.isInteger(tick) && Number.isInteger(tickSpacing), "INTEGERS")
  invariant6(tickSpacing > 0, "TICK_SPACING")
  invariant6(tick >= TickMath.MIN_TICK && tick <= TickMath.MAX_TICK, "TICK_BOUND")
  const rounded = Math.round(tick / tickSpacing) * tickSpacing
  if (rounded < TickMath.MIN_TICK) return rounded + tickSpacing
  else if (rounded > TickMath.MAX_TICK) return rounded - tickSpacing
  else return rounded
}

// src/utils/position.ts
var Q128 = jsbi_default.exponentiate(jsbi_default.BigInt(2), jsbi_default.BigInt(128))
var PositionLibrary = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  // replicates the portions of Position#update required to compute unaccounted fees
  static getTokensOwed(feeGrowthInside0LastX128, feeGrowthInside1LastX128, liquidity, feeGrowthInside0X128, feeGrowthInside1X128) {
    const tokensOwed0 = jsbi_default.divide(
      jsbi_default.multiply(subIn256(feeGrowthInside0X128, feeGrowthInside0LastX128), liquidity),
      Q128
    )
    const tokensOwed1 = jsbi_default.divide(
      jsbi_default.multiply(subIn256(feeGrowthInside1X128, feeGrowthInside1LastX128), liquidity),
      Q128
    )
    return [tokensOwed0, tokensOwed1]
  }
}

// src/utils/priceTickConversions.ts
import { Price } from "@uniswap/sdk-core"
function tickToPrice(baseToken, quoteToken, tick) {
  const sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick)
  const ratioX192 = jsbi_default.multiply(sqrtRatioX96, sqrtRatioX96)
  return baseToken.sortsBefore(quoteToken) ? new Price(baseToken, quoteToken, Q192, ratioX192) : new Price(baseToken, quoteToken, ratioX192, Q192)
}
function priceToClosestTick(price) {
  const sorted = price.baseCurrency.sortsBefore(price.quoteCurrency)
  const sqrtRatioX96 = sorted ? encodeSqrtRatioX96(price.numerator, price.denominator) : encodeSqrtRatioX96(price.denominator, price.numerator)
  let tick = TickMath.getTickAtSqrtRatio(sqrtRatioX96)
  const nextTickPrice = tickToPrice(price.baseCurrency, price.quoteCurrency, tick + 1)
  if (sorted) {
    if (!price.lessThan(nextTickPrice)) {
      tick++
    }
  } else {
    if (!price.greaterThan(nextTickPrice)) {
      tick++
    }
  }
  return tick
}

// src/utils/tickLibrary.ts
var Q256 = jsbi_default.exponentiate(jsbi_default.BigInt(2), jsbi_default.BigInt(256))
function subIn256(x, y) {
  const difference = jsbi_default.subtract(x, y)
  if (jsbi_default.lessThan(difference, ZERO)) {
    return jsbi_default.add(Q256, difference)
  } else {
    return difference
  }
}
var TickLibrary = class {
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static getFeeGrowthInside(feeGrowthOutsideLower, feeGrowthOutsideUpper, tickLower, tickUpper, tickCurrent, feeGrowthGlobal0X128, feeGrowthGlobal1X128) {
    let feeGrowthBelow0X128
    let feeGrowthBelow1X128
    if (tickCurrent >= tickLower) {
      feeGrowthBelow0X128 = feeGrowthOutsideLower.feeGrowthOutside0X128
      feeGrowthBelow1X128 = feeGrowthOutsideLower.feeGrowthOutside1X128
    } else {
      feeGrowthBelow0X128 = subIn256(feeGrowthGlobal0X128, feeGrowthOutsideLower.feeGrowthOutside0X128)
      feeGrowthBelow1X128 = subIn256(feeGrowthGlobal1X128, feeGrowthOutsideLower.feeGrowthOutside1X128)
    }
    let feeGrowthAbove0X128
    let feeGrowthAbove1X128
    if (tickCurrent < tickUpper) {
      feeGrowthAbove0X128 = feeGrowthOutsideUpper.feeGrowthOutside0X128
      feeGrowthAbove1X128 = feeGrowthOutsideUpper.feeGrowthOutside1X128
    } else {
      feeGrowthAbove0X128 = subIn256(feeGrowthGlobal0X128, feeGrowthOutsideUpper.feeGrowthOutside0X128)
      feeGrowthAbove1X128 = subIn256(feeGrowthGlobal1X128, feeGrowthOutsideUpper.feeGrowthOutside1X128)
    }
    return [
      subIn256(subIn256(feeGrowthGlobal0X128, feeGrowthBelow0X128), feeGrowthAbove0X128),
      subIn256(subIn256(feeGrowthGlobal1X128, feeGrowthBelow1X128), feeGrowthAbove1X128)
    ]
  }
}

// src/entities/tick.ts
var Tick = class {
  index
  liquidityGross
  liquidityNet
  constructor({ index, liquidityGross, liquidityNet }) {
    invariant7(index >= TickMath.MIN_TICK && index <= TickMath.MAX_TICK, "TICK")
    this.index = index
    this.liquidityGross = jsbi_default.BigInt(liquidityGross)
    this.liquidityNet = jsbi_default.BigInt(liquidityNet)
  }
}

// src/entities/tickListDataProvider.ts
var TickListDataProvider = class {
  ticks
  constructor(ticks, tickSpacing) {
    const ticksMapped = ticks.map((t) => t instanceof Tick ? t : new Tick(t))
    TickList.validateList(ticksMapped, tickSpacing)
    this.ticks = ticksMapped
  }
  async getTick(tick) {
    return TickList.getTick(this.ticks, tick)
  }
  async nextInitializedTickWithinOneWord(tick, lte, tickSpacing) {
    return TickList.nextInitializedTickWithinOneWord(this.ticks, tick, lte, tickSpacing)
  }
}

// src/entities/pool.ts
var NO_TICK_DATA_PROVIDER_DEFAULT = new NoTickDataProvider()
var Pool = class _Pool {
  token0
  token1
  fee
  sqrtRatioX96
  liquidity
  tickCurrent
  tickDataProvider
  _token0Price
  _token1Price
  static getAddress(tokenA, tokenB, fee, initCodeHashManualOverride, factoryAddressOverride) {
    return computePoolAddress({
      factoryAddress: factoryAddressOverride ?? FACTORY_ADDRESS,
      fee,
      tokenA,
      tokenB,
      initCodeHashManualOverride
    })
  }
  /**
   * Construct a pool
   * @param tokenA One of the tokens in the pool
   * @param tokenB The other token in the pool
   * @param fee The fee in hundredths of a bips of the input amount of every swap that is collected by the pool
   * @param sqrtRatioX96 The sqrt of the current ratio of amounts of token1 to token0
   * @param liquidity The current value of in range liquidity
   * @param tickCurrent The current tick of the pool
   * @param ticks The current state of the pool ticks or a data provider that can return tick data
   */
  constructor(tokenA, tokenB, fee, sqrtRatioX96, liquidity, tickCurrent, ticks = NO_TICK_DATA_PROVIDER_DEFAULT) {
    invariant8(Number.isInteger(fee) && fee < 1e6, "FEE")
    const tickCurrentSqrtRatioX96 = TickMath.getSqrtRatioAtTick(tickCurrent)
    const nextTickSqrtRatioX96 = TickMath.getSqrtRatioAtTick(tickCurrent + 1)
    invariant8(
      jsbi_default.greaterThanOrEqual(jsbi_default.BigInt(sqrtRatioX96), tickCurrentSqrtRatioX96) && jsbi_default.lessThanOrEqual(jsbi_default.BigInt(sqrtRatioX96), nextTickSqrtRatioX96),
      "PRICE_BOUNDS"
    );
    [this.token0, this.token1] = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA]
    this.fee = fee
    this.sqrtRatioX96 = jsbi_default.BigInt(sqrtRatioX96)
    this.liquidity = jsbi_default.BigInt(liquidity)
    this.tickCurrent = tickCurrent
    this.tickDataProvider = Array.isArray(ticks) ? new TickListDataProvider(ticks, TICK_SPACINGS[fee]) : ticks
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token The token to check
   * @returns True if token is either token0 or token
   */
  involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1)
  }
  /**
   * Returns the current mid price of the pool in terms of token0, i.e. the ratio of token1 over token0
   */
  get token0Price() {
    return this._token0Price ?? (this._token0Price = new Price2(
      this.token0,
      this.token1,
      Q192,
      jsbi_default.multiply(this.sqrtRatioX96, this.sqrtRatioX96)
    ))
  }
  /**
   * Returns the current mid price of the pool in terms of token1, i.e. the ratio of token0 over token1
   */
  get token1Price() {
    return this._token1Price ?? (this._token1Price = new Price2(
      this.token1,
      this.token0,
      jsbi_default.multiply(this.sqrtRatioX96, this.sqrtRatioX96),
      Q192
    ))
  }
  /**
   * Return the price of the given token in terms of the other token in the pool.
   * @param token The token to return price of
   * @returns The price of the given token, in terms of the other.
   */
  priceOf(token) {
    invariant8(this.involvesToken(token), "TOKEN")
    return token.equals(this.token0) ? this.token0Price : this.token1Price
  }
  /**
   * Returns the chain ID of the tokens in the pool.
   */
  get chainId() {
    return this.token0.chainId
  }
  /**
   * Given an input amount of a token, return the computed output amount, and a pool with state updated after the trade
   * @param inputAmount The input amount for which to quote the output amount
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit
   * @returns The output amount and the pool with updated state
   */
  async getOutputAmount(inputAmount, sqrtPriceLimitX96) {
    invariant8(this.involvesToken(inputAmount.currency), "TOKEN")
    const zeroForOne = inputAmount.currency.equals(this.token0)
    const {
      amountCalculated: outputAmount,
      sqrtRatioX96,
      liquidity,
      tickCurrent
    } = await this.swap(zeroForOne, inputAmount.quotient, sqrtPriceLimitX96)
    const outputToken = zeroForOne ? this.token1 : this.token0
    return [
      CurrencyAmount.fromRawAmount(outputToken, jsbi_default.multiply(outputAmount, NEGATIVE_ONE)),
      new _Pool(this.token0, this.token1, this.fee, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)
    ]
  }
  /**
   * Given a desired output amount of a token, return the computed input amount and a pool with state updated after the trade
   * @param outputAmount the output amount for which to quote the input amount
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns The input amount and the pool with updated state
   */
  async getInputAmount(outputAmount, sqrtPriceLimitX96) {
    invariant8(outputAmount.currency.isToken && this.involvesToken(outputAmount.currency), "TOKEN")
    const zeroForOne = outputAmount.currency.equals(this.token1)
    const {
      amountCalculated: inputAmount,
      sqrtRatioX96,
      liquidity,
      tickCurrent
    } = await this.swap(zeroForOne, jsbi_default.multiply(outputAmount.quotient, NEGATIVE_ONE), sqrtPriceLimitX96)
    const inputToken = zeroForOne ? this.token0 : this.token1
    return [
      CurrencyAmount.fromRawAmount(inputToken, inputAmount),
      new _Pool(this.token0, this.token1, this.fee, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)
    ]
  }
  /**
   * Executes a swap
   * @param zeroForOne Whether the amount in is token0 or token1
   * @param amountSpecified The amount of the swap, which implicitly configures the swap as exact input (positive), or exact output (negative)
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns amountCalculated
   * @returns sqrtRatioX96
   * @returns liquidity
   * @returns tickCurrent
   */
  async swap(zeroForOne, amountSpecified, sqrtPriceLimitX96) {
    return v3Swap(
      jsbi_default.BigInt(this.fee),
      this.sqrtRatioX96,
      this.tickCurrent,
      this.liquidity,
      this.tickSpacing,
      this.tickDataProvider,
      zeroForOne,
      amountSpecified,
      sqrtPriceLimitX96
    )
  }
  get tickSpacing() {
    return TICK_SPACINGS[this.fee]
  }
}

// src/entities/position.ts
import { MaxUint256 as MaxUint2564, Percent, CurrencyAmount as CurrencyAmount2 } from "@uniswap/sdk-core"
import invariant9 from "tiny-invariant"
var Position = class _Position {
  pool
  tickLower
  tickUpper
  liquidity
  // cached resuts for the getters
  _token0Amount = null;
  _token1Amount = null;
  _mintAmounts = null;
  /**
   * Constructs a position for a given pool with the given liquidity
   * @param pool For which pool the liquidity is assigned
   * @param liquidity The amount of liquidity that is in the position
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   */
  constructor({ pool, liquidity, tickLower, tickUpper }) {
    invariant9(tickLower < tickUpper, "TICK_ORDER")
    invariant9(tickLower >= TickMath.MIN_TICK && tickLower % pool.tickSpacing === 0, "TICK_LOWER")
    invariant9(tickUpper <= TickMath.MAX_TICK && tickUpper % pool.tickSpacing === 0, "TICK_UPPER")
    this.pool = pool
    this.tickLower = tickLower
    this.tickUpper = tickUpper
    this.liquidity = jsbi_default.BigInt(liquidity)
  }
  /**
   * Returns the price of token0 at the lower tick
   */
  get token0PriceLower() {
    return tickToPrice(this.pool.token0, this.pool.token1, this.tickLower)
  }
  /**
   * Returns the price of token0 at the upper tick
   */
  get token0PriceUpper() {
    return tickToPrice(this.pool.token0, this.pool.token1, this.tickUpper)
  }
  /**
   * Returns the amount of token0 that this position's liquidity could be burned for at the current pool price
   */
  get amount0() {
    if (this._token0Amount === null) {
      if (this.pool.tickCurrent < this.tickLower) {
        this._token0Amount = CurrencyAmount2.fromRawAmount(
          this.pool.token0,
          SqrtPriceMath.getAmount0Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            false
          )
        )
      } else if (this.pool.tickCurrent < this.tickUpper) {
        this._token0Amount = CurrencyAmount2.fromRawAmount(
          this.pool.token0,
          SqrtPriceMath.getAmount0Delta(
            this.pool.sqrtRatioX96,
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            false
          )
        )
      } else {
        this._token0Amount = CurrencyAmount2.fromRawAmount(this.pool.token0, ZERO)
      }
    }
    return this._token0Amount
  }
  /**
   * Returns the amount of token1 that this position's liquidity could be burned for at the current pool price
   */
  get amount1() {
    if (this._token1Amount === null) {
      if (this.pool.tickCurrent < this.tickLower) {
        this._token1Amount = CurrencyAmount2.fromRawAmount(this.pool.token1, ZERO)
      } else if (this.pool.tickCurrent < this.tickUpper) {
        this._token1Amount = CurrencyAmount2.fromRawAmount(
          this.pool.token1,
          SqrtPriceMath.getAmount1Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            this.pool.sqrtRatioX96,
            this.liquidity,
            false
          )
        )
      } else {
        this._token1Amount = CurrencyAmount2.fromRawAmount(
          this.pool.token1,
          SqrtPriceMath.getAmount1Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            false
          )
        )
      }
    }
    return this._token1Amount
  }
  /**
   * Returns the lower and upper sqrt ratios if the price 'slips' up to slippage tolerance percentage
   * @param slippageTolerance The amount by which the price can 'slip' before the transaction will revert
   * @returns The sqrt ratios after slippage
   */
  ratiosAfterSlippage(slippageTolerance) {
    const priceLower = this.pool.token0Price.asFraction.multiply(new Percent(1).subtract(slippageTolerance))
    const priceUpper = this.pool.token0Price.asFraction.multiply(slippageTolerance.add(1))
    let sqrtRatioX96Lower = encodeSqrtRatioX96(priceLower.numerator, priceLower.denominator)
    if (jsbi_default.lessThanOrEqual(sqrtRatioX96Lower, TickMath.MIN_SQRT_RATIO)) {
      sqrtRatioX96Lower = jsbi_default.add(TickMath.MIN_SQRT_RATIO, jsbi_default.BigInt(1))
    }
    let sqrtRatioX96Upper = encodeSqrtRatioX96(priceUpper.numerator, priceUpper.denominator)
    if (jsbi_default.greaterThanOrEqual(sqrtRatioX96Upper, TickMath.MAX_SQRT_RATIO)) {
      sqrtRatioX96Upper = jsbi_default.subtract(TickMath.MAX_SQRT_RATIO, jsbi_default.BigInt(1))
    }
    return {
      sqrtRatioX96Lower,
      sqrtRatioX96Upper
    }
  }
  /**
   * Returns the minimum amounts that must be sent in order to safely mint the amount of liquidity held by the position
   * with the given slippage tolerance
   * @param slippageTolerance Tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */
  mintAmountsWithSlippage(slippageTolerance) {
    const { sqrtRatioX96Upper, sqrtRatioX96Lower } = this.ratiosAfterSlippage(slippageTolerance)
    const poolLower = new Pool(
      this.pool.token0,
      this.pool.token1,
      this.pool.fee,
      sqrtRatioX96Lower,
      0,
      TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower)
    )
    const poolUpper = new Pool(
      this.pool.token0,
      this.pool.token1,
      this.pool.fee,
      sqrtRatioX96Upper,
      0,
      TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper)
    )
    const positionThatWillBeCreated = _Position.fromAmounts({
      pool: this.pool,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper,
      ...this.mintAmounts,
      // the mint amounts are what will be passed as calldata
      useFullPrecision: false
    })
    const { amount0 } = new _Position({
      pool: poolUpper,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts
    const { amount1 } = new _Position({
      pool: poolLower,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts
    return { amount0, amount1 }
  }
  /**
   * Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
   * position with the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */
  burnAmountsWithSlippage(slippageTolerance) {
    const { sqrtRatioX96Upper, sqrtRatioX96Lower } = this.ratiosAfterSlippage(slippageTolerance)
    const poolLower = new Pool(
      this.pool.token0,
      this.pool.token1,
      this.pool.fee,
      sqrtRatioX96Lower,
      0,
      TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower)
    )
    const poolUpper = new Pool(
      this.pool.token0,
      this.pool.token1,
      this.pool.fee,
      sqrtRatioX96Upper,
      0,
      TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper)
    )
    const amount0 = new _Position({
      pool: poolUpper,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount0
    const amount1 = new _Position({
      pool: poolLower,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount1
    return { amount0: amount0.quotient, amount1: amount1.quotient }
  }
  /**
   * Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
   * the current price for the pool
   */
  get mintAmounts() {
    if (this._mintAmounts === null) {
      if (this.pool.tickCurrent < this.tickLower) {
        return {
          amount0: SqrtPriceMath.getAmount0Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            true
          ),
          amount1: ZERO
        }
      } else if (this.pool.tickCurrent < this.tickUpper) {
        return {
          amount0: SqrtPriceMath.getAmount0Delta(
            this.pool.sqrtRatioX96,
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            true
          ),
          amount1: SqrtPriceMath.getAmount1Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            this.pool.sqrtRatioX96,
            this.liquidity,
            true
          )
        }
      } else {
        return {
          amount0: ZERO,
          amount1: SqrtPriceMath.getAmount1Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            true
          )
        }
      }
    }
    return this._mintAmounts
  }
  /**
   * Computes the maximum amount of liquidity received for a given amount of token0, token1,
   * and the prices at the tick boundaries.
   * @param pool The pool for which the position should be created
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   * @param amount0 token0 amount
   * @param amount1 token1 amount
   * @param useFullPrecision If false, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The amount of liquidity for the position
   */
  static fromAmounts({
    pool,
    tickLower,
    tickUpper,
    amount0,
    amount1,
    useFullPrecision
  }) {
    const sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower)
    const sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper)
    return new _Position({
      pool,
      tickLower,
      tickUpper,
      liquidity: maxLiquidityForAmounts(
        pool.sqrtRatioX96,
        sqrtRatioAX96,
        sqrtRatioBX96,
        amount0,
        amount1,
        useFullPrecision
      )
    })
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount0 The desired amount of token0
   * @param useFullPrecision If true, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The position
   */
  static fromAmount0({
    pool,
    tickLower,
    tickUpper,
    amount0,
    useFullPrecision
  }) {
    return _Position.fromAmounts({ pool, tickLower, tickUpper, amount0, amount1: MaxUint2564, useFullPrecision })
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount1 The desired amount of token1
   * @returns The position
   */
  static fromAmount1({
    pool,
    tickLower,
    tickUpper,
    amount1
  }) {
    return _Position.fromAmounts({ pool, tickLower, tickUpper, amount0: MaxUint2564, amount1, useFullPrecision: true })
  }
}

// src/entities/route.ts
import invariant10 from "tiny-invariant"
import { Price as Price4 } from "@uniswap/sdk-core"
var Route = class {
  pools
  tokenPath
  input
  output
  _midPrice = null;
  /**
   * Creates an instance of route.
   * @param pools An array of `Pool` objects, ordered by the route the swap will take
   * @param input The input token
   * @param output The output token
   */
  constructor(pools, input, output) {
    invariant10(pools.length > 0, "POOLS")
    const chainId = pools[0].chainId
    const allOnSameChain = pools.every((pool) => pool.chainId === chainId)
    invariant10(allOnSameChain, "CHAIN_IDS")
    const wrappedInput = input.wrapped
    invariant10(pools[0].involvesToken(wrappedInput), "INPUT")
    invariant10(pools[pools.length - 1].involvesToken(output.wrapped), "OUTPUT")
    const tokenPath = [wrappedInput]
    for (const [i, pool] of pools.entries()) {
      const currentInputToken = tokenPath[i]
      invariant10(currentInputToken.equals(pool.token0) || currentInputToken.equals(pool.token1), "PATH")
      const nextToken = currentInputToken.equals(pool.token0) ? pool.token1 : pool.token0
      tokenPath.push(nextToken)
    }
    this.pools = pools
    this.tokenPath = tokenPath
    this.input = input
    this.output = output ?? tokenPath[tokenPath.length - 1]
  }
  get chainId() {
    return this.pools[0].chainId
  }
  /**
   * Returns the mid price of the route
   */
  get midPrice() {
    if (this._midPrice !== null) return this._midPrice
    const price = this.pools.slice(1).reduce(
      ({ nextInput, price: price2 }, pool) => {
        return nextInput.equals(pool.token0) ? {
          nextInput: pool.token1,
          price: price2.multiply(pool.token0Price)
        } : {
          nextInput: pool.token0,
          price: price2.multiply(pool.token1Price)
        }
      },
      this.pools[0].token0.equals(this.input.wrapped) ? {
        nextInput: this.pools[0].token1,
        price: this.pools[0].token0Price
      } : {
        nextInput: this.pools[0].token0,
        price: this.pools[0].token1Price
      }
    ).price
    return this._midPrice = new Price4(this.input, this.output, price.denominator, price.numerator)
  }
}

// src/entities/trade.ts
import { Fraction, Percent as Percent2, Price as Price5, sortedInsert, CurrencyAmount as CurrencyAmount3, TradeType } from "@uniswap/sdk-core"
import invariant11 from "tiny-invariant"
function tradeComparator(a, b) {
  invariant11(a.inputAmount.currency.equals(b.inputAmount.currency), "INPUT_CURRENCY")
  invariant11(a.outputAmount.currency.equals(b.outputAmount.currency), "OUTPUT_CURRENCY")
  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      const aHops = a.swaps.reduce((total, cur) => total + cur.route.tokenPath.length, 0)
      const bHops = b.swaps.reduce((total, cur) => total + cur.route.tokenPath.length, 0)
      return aHops - bHops
    }
    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1
    } else {
      return 1
    }
  } else {
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1
    } else {
      return -1
    }
  }
}
var Trade = class _Trade {
  /**
   * @deprecated Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
   * this will return an error.
   *
   * When the trade consists of just a single route, this returns the route of the trade,
   * i.e. which pools the trade goes through.
   */
  get route() {
    invariant11(this.swaps.length === 1, "MULTIPLE_ROUTES")
    return this.swaps[0].route
  }
  /**
   * The swaps of the trade, i.e. which routes and how much is swapped in each that
   * make up the trade.
   */
  swaps
  /**
   * The type of the trade, either exact in or exact out.
   */
  tradeType
  /**
   * The cached result of the input amount computation
   * @private
   */
  _inputAmount
  /**
   * The input amount for the trade assuming no slippage.
   */
  get inputAmount() {
    if (this._inputAmount) {
      return this._inputAmount
    }
    const inputCurrency = this.swaps[0].inputAmount.currency
    const totalInputFromRoutes = this.swaps.map(({ inputAmount }) => inputAmount).reduce((total, cur) => total.add(cur), CurrencyAmount3.fromRawAmount(inputCurrency, 0))
    this._inputAmount = totalInputFromRoutes
    return this._inputAmount
  }
  /**
   * The cached result of the output amount computation
   * @private
   */
  _outputAmount
  /**
   * The output amount for the trade assuming no slippage.
   */
  get outputAmount() {
    if (this._outputAmount) {
      return this._outputAmount
    }
    const outputCurrency = this.swaps[0].outputAmount.currency
    const totalOutputFromRoutes = this.swaps.map(({ outputAmount }) => outputAmount).reduce((total, cur) => total.add(cur), CurrencyAmount3.fromRawAmount(outputCurrency, 0))
    this._outputAmount = totalOutputFromRoutes
    return this._outputAmount
  }
  /**
   * The cached result of the computed execution price
   * @private
   */
  _executionPrice
  /**
   * The price expressed in terms of output amount/input amount.
   */
  get executionPrice() {
    return this._executionPrice ?? (this._executionPrice = new Price5(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.inputAmount.quotient,
      this.outputAmount.quotient
    ))
  }
  /**
   * The cached result of the price impact computation
   * @private
   */
  _priceImpact
  /**
   * Returns the percent difference between the route's mid price and the price impact
   */
  get priceImpact() {
    if (this._priceImpact) {
      return this._priceImpact
    }
    let spotOutputAmount = CurrencyAmount3.fromRawAmount(this.outputAmount.currency, 0)
    for (const { route, inputAmount } of this.swaps) {
      const midPrice = route.midPrice
      spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount))
    }
    const priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount)
    this._priceImpact = new Percent2(priceImpact.numerator, priceImpact.denominator)
    return this._priceImpact
  }
  /**
   * Constructs an exact in trade with the given amount in and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact in trade
   * @param amountIn The amount being passed in
   * @returns The exact in trade
   */
  static async exactIn(route, amountIn) {
    return _Trade.fromRoute(route, amountIn, TradeType.EXACT_INPUT)
  }
  /**
   * Constructs an exact out trade with the given amount out and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact out trade
   * @param amountOut The amount returned by the trade
   * @returns The exact out trade
   */
  static async exactOut(route, amountOut) {
    return _Trade.fromRoute(route, amountOut, TradeType.EXACT_OUTPUT)
  }
  /**
   * Constructs a trade by simulating swaps through the given route
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param route route to swap through
   * @param amount the amount specified, either input or output, depending on tradeType
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The route
   */
  static async fromRoute(route, amount, tradeType) {
    const amounts = new Array(route.tokenPath.length)
    let inputAmount
    let outputAmount
    if (tradeType === TradeType.EXACT_INPUT) {
      invariant11(amount.currency.equals(route.input), "INPUT")
      amounts[0] = amount.wrapped
      for (let i = 0; i < route.tokenPath.length - 1; i++) {
        const pool = route.pools[i]
        const [outputAmount2] = await pool.getOutputAmount(amounts[i])
        amounts[i + 1] = outputAmount2
      }
      inputAmount = CurrencyAmount3.fromFractionalAmount(route.input, amount.numerator, amount.denominator)
      outputAmount = CurrencyAmount3.fromFractionalAmount(
        route.output,
        amounts[amounts.length - 1].numerator,
        amounts[amounts.length - 1].denominator
      )
    } else {
      invariant11(amount.currency.equals(route.output), "OUTPUT")
      amounts[amounts.length - 1] = amount.wrapped
      for (let i = route.tokenPath.length - 1; i > 0; i--) {
        const pool = route.pools[i - 1]
        const [inputAmount2] = await pool.getInputAmount(amounts[i])
        amounts[i - 1] = inputAmount2
      }
      inputAmount = CurrencyAmount3.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator)
      outputAmount = CurrencyAmount3.fromFractionalAmount(route.output, amount.numerator, amount.denominator)
    }
    return new _Trade({
      routes: [{ inputAmount, outputAmount, route }],
      tradeType
    })
  }
  /**
   * Constructs a trade from routes by simulating swaps
   *
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param routes the routes to swap through and how much of the amount should be routed through each
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The trade
   */
  static async fromRoutes(routes, tradeType) {
    const populatedRoutes = []
    for (const { route, amount } of routes) {
      const amounts = new Array(route.tokenPath.length)
      let inputAmount
      let outputAmount
      if (tradeType === TradeType.EXACT_INPUT) {
        invariant11(amount.currency.equals(route.input), "INPUT")
        inputAmount = CurrencyAmount3.fromFractionalAmount(route.input, amount.numerator, amount.denominator)
        amounts[0] = CurrencyAmount3.fromFractionalAmount(route.input.wrapped, amount.numerator, amount.denominator)
        for (let i = 0; i < route.tokenPath.length - 1; i++) {
          const pool = route.pools[i]
          const [outputAmount2] = await pool.getOutputAmount(amounts[i])
          amounts[i + 1] = outputAmount2
        }
        outputAmount = CurrencyAmount3.fromFractionalAmount(
          route.output,
          amounts[amounts.length - 1].numerator,
          amounts[amounts.length - 1].denominator
        )
      } else {
        invariant11(amount.currency.equals(route.output), "OUTPUT")
        outputAmount = CurrencyAmount3.fromFractionalAmount(route.output, amount.numerator, amount.denominator)
        amounts[amounts.length - 1] = CurrencyAmount3.fromFractionalAmount(
          route.output.wrapped,
          amount.numerator,
          amount.denominator
        )
        for (let i = route.tokenPath.length - 1; i > 0; i--) {
          const pool = route.pools[i - 1]
          const [inputAmount2] = await pool.getInputAmount(amounts[i])
          amounts[i - 1] = inputAmount2
        }
        inputAmount = CurrencyAmount3.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator)
      }
      populatedRoutes.push({ route, inputAmount, outputAmount })
    }
    return new _Trade({
      routes: populatedRoutes,
      tradeType
    })
  }
  /**
   * Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  static createUncheckedTrade(constructorArguments) {
    return new _Trade({
      ...constructorArguments,
      routes: [
        {
          inputAmount: constructorArguments.inputAmount,
          outputAmount: constructorArguments.outputAmount,
          route: constructorArguments.route
        }
      ]
    })
  }
  /**
   * Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  static createUncheckedTradeWithMultipleRoutes(constructorArguments) {
    return new _Trade(constructorArguments)
  }
  /**
   * Construct a trade by passing in the pre-computed property values
   * @param routes The routes through which the trade occurs
   * @param tradeType The type of trade, exact input or exact output
   */
  constructor({
    routes,
    tradeType
  }) {
    const inputCurrency = routes[0].inputAmount.currency
    const outputCurrency = routes[0].outputAmount.currency
    invariant11(
      routes.every(({ route }) => inputCurrency.wrapped.equals(route.input.wrapped)),
      "INPUT_CURRENCY_MATCH"
    )
    invariant11(
      routes.every(({ route }) => outputCurrency.wrapped.equals(route.output.wrapped)),
      "OUTPUT_CURRENCY_MATCH"
    )
    const numPools = routes.map(({ route }) => route.pools.length).reduce((total, cur) => total + cur, 0)
    const poolAddressSet = /* @__PURE__ */ new Set()
    for (const { route } of routes) {
      for (const pool of route.pools) {
        poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee))
      }
    }
    invariant11(numPools === poolAddressSet.size, "POOLS_DUPLICATED")
    this.swaps = routes
    this.tradeType = tradeType
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  minimumAmountOut(slippageTolerance, amountOut = this.outputAmount) {
    invariant11(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE")
    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut
    } else {
      const slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient
      return CurrencyAmount3.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut)
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */
  maximumAmountIn(slippageTolerance, amountIn = this.inputAmount) {
    invariant11(!slippageTolerance.lessThan(ZERO), "SLIPPAGE_TOLERANCE")
    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn
    } else {
      const slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient
      return CurrencyAmount3.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn)
    }
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */
  worstExecutionPrice(slippageTolerance) {
    return new Price5(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.maximumAmountIn(slippageTolerance).quotient,
      this.minimumAmountOut(slippageTolerance).quotient
    )
  }
  /**
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact in trade
   */
  static async bestTradeExactIn(pools, currencyAmountIn, currencyOut, { maxNumResults = 3, maxHops = 3 } = {}, currentPools = [], nextAmountIn = currencyAmountIn, bestTrades = []) {
    invariant11(pools.length > 0, "POOLS")
    invariant11(maxHops > 0, "MAX_HOPS")
    invariant11(currencyAmountIn === nextAmountIn || currentPools.length > 0, "INVALID_RECURSION")
    const amountIn = nextAmountIn.wrapped
    const tokenOut = currencyOut.wrapped
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i]
      if (!pool.token0.equals(amountIn.currency) && !pool.token1.equals(amountIn.currency)) continue
      let amountOut
      try {
        ;
        [amountOut] = await pool.getOutputAmount(amountIn)
      } catch (error) {
        if (error.isInsufficientInputAmountError) {
          continue
        }
        throw error
      }
      if (amountOut.currency.isToken && amountOut.currency.equals(tokenOut)) {
        sortedInsert(
          bestTrades,
          await _Trade.fromRoute(
            new Route([...currentPools, pool], currencyAmountIn.currency, currencyOut),
            currencyAmountIn,
            TradeType.EXACT_INPUT
          ),
          maxNumResults,
          tradeComparator
        )
      } else if (maxHops > 1 && pools.length > 1) {
        const poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length))
        await _Trade.bestTradeExactIn(
          poolsExcludingThisPool,
          currencyAmountIn,
          currencyOut,
          {
            maxNumResults,
            maxHops: maxHops - 1
          },
          [...currentPools, pool],
          amountOut,
          bestTrades
        )
      }
    }
    return bestTrades
  }
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the desired currency amount out
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact out trade
   */
  static async bestTradeExactOut(pools, currencyIn, currencyAmountOut, { maxNumResults = 3, maxHops = 3 } = {}, currentPools = [], nextAmountOut = currencyAmountOut, bestTrades = []) {
    invariant11(pools.length > 0, "POOLS")
    invariant11(maxHops > 0, "MAX_HOPS")
    invariant11(currencyAmountOut === nextAmountOut || currentPools.length > 0, "INVALID_RECURSION")
    const amountOut = nextAmountOut.wrapped
    const tokenIn = currencyIn.wrapped
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i]
      if (!pool.token0.equals(amountOut.currency) && !pool.token1.equals(amountOut.currency)) continue
      let amountIn
      try {
        ;
        [amountIn] = await pool.getInputAmount(amountOut)
      } catch (error) {
        if (error.isInsufficientReservesError) {
          continue
        }
        throw error
      }
      if (amountIn.currency.equals(tokenIn)) {
        sortedInsert(
          bestTrades,
          await _Trade.fromRoute(
            new Route([pool, ...currentPools], currencyIn, currencyAmountOut.currency),
            currencyAmountOut,
            TradeType.EXACT_OUTPUT
          ),
          maxNumResults,
          tradeComparator
        )
      } else if (maxHops > 1 && pools.length > 1) {
        const poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length))
        await _Trade.bestTradeExactOut(
          poolsExcludingThisPool,
          currencyIn,
          currencyAmountOut,
          {
            maxNumResults,
            maxHops: maxHops - 1
          },
          [pool, ...currentPools],
          amountIn,
          bestTrades
        )
      }
    }
    return bestTrades
  }
}

// src/multicall.ts
import { Interface } from "@ethersproject/abi"
import IMulticall from "@uniswap/v3-periphery/artifacts/contracts/interfaces/IMulticall.sol/IMulticall.json" with {type: 'json'}
var Multicall = class _Multicall {
  static INTERFACE = new Interface(IMulticall.abi);
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static encodeMulticall(calldatas) {
    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas]
    }
    return calldatas.length === 1 ? calldatas[0] : _Multicall.INTERFACE.encodeFunctionData("multicall", [calldatas])
  }
  static decodeMulticall(multicall) {
    return _Multicall.INTERFACE.decodeFunctionData("multicall", multicall).data
  }
}

// src/nonfungiblePositionManager.ts
import {
  CurrencyAmount as CurrencyAmount4,
  validateAndParseAddress as validateAndParseAddress2
} from "@uniswap/sdk-core"
import invariant12 from "tiny-invariant"
import { Interface as Interface4 } from "@ethersproject/abi"
import INonfungiblePositionManager from "@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"  with {type: "json"}

// src/selfPermit.ts
import { Interface as Interface2 } from "@ethersproject/abi"
import ISelfPermit from "@uniswap/v3-periphery/artifacts/contracts/interfaces/ISelfPermit.sol/ISelfPermit.json" with {type: "json"}
function isAllowedPermit(permitOptions) {
  return "nonce" in permitOptions
}
var SelfPermit = class _SelfPermit {
  static INTERFACE = new Interface2(ISelfPermit.abi);
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static encodePermit(token, options) {
    return isAllowedPermit(options) ? _SelfPermit.INTERFACE.encodeFunctionData("selfPermitAllowed", [
      token.address,
      toHex(options.nonce),
      toHex(options.expiry),
      options.v,
      options.r,
      options.s
    ]) : _SelfPermit.INTERFACE.encodeFunctionData("selfPermit", [
      token.address,
      toHex(options.amount),
      toHex(options.deadline),
      options.v,
      options.r,
      options.s
    ])
  }
}

// src/payments.ts
import { Interface as Interface3 } from "@ethersproject/abi"
import IPeripheryPaymentsWithFee from "@uniswap/v3-periphery/artifacts/contracts/interfaces/IPeripheryPaymentsWithFee.sol/IPeripheryPaymentsWithFee.json" with {type: "json"}

import { validateAndParseAddress } from "@uniswap/sdk-core"
var Payments = class _Payments {
  static INTERFACE = new Interface3(IPeripheryPaymentsWithFee.abi);
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static encodeFeeBips(fee) {
    return toHex(fee.multiply(1e4).quotient)
  }
  static encodeUnwrapWETH9(amountMinimum, recipient, feeOptions) {
    recipient = validateAndParseAddress(recipient)
    if (!!feeOptions) {
      const feeBips = this.encodeFeeBips(feeOptions.fee)
      const feeRecipient = validateAndParseAddress(feeOptions.recipient)
      return _Payments.INTERFACE.encodeFunctionData("unwrapWETH9WithFee", [
        toHex(amountMinimum),
        recipient,
        feeBips,
        feeRecipient
      ])
    } else {
      return _Payments.INTERFACE.encodeFunctionData("unwrapWETH9", [toHex(amountMinimum), recipient])
    }
  }
  static encodeSweepToken(token, amountMinimum, recipient, feeOptions) {
    recipient = validateAndParseAddress(recipient)
    if (!!feeOptions) {
      const feeBips = this.encodeFeeBips(feeOptions.fee)
      const feeRecipient = validateAndParseAddress(feeOptions.recipient)
      return _Payments.INTERFACE.encodeFunctionData("sweepTokenWithFee", [
        token.address,
        toHex(amountMinimum),
        recipient,
        feeBips,
        feeRecipient
      ])
    } else {
      return _Payments.INTERFACE.encodeFunctionData("sweepToken", [token.address, toHex(amountMinimum), recipient])
    }
  }
  static encodeRefundETH() {
    return _Payments.INTERFACE.encodeFunctionData("refundETH")
  }
}

// src/nonfungiblePositionManager.ts
var MaxUint128 = toHex(jsbi_default.subtract(jsbi_default.exponentiate(jsbi_default.BigInt(2), jsbi_default.BigInt(128)), jsbi_default.BigInt(1)))
function isMint(options) {
  return Object.keys(options).some((k) => k === "recipient")
}
var NFT_PERMIT_TYPES = {
  Permit: [
    { name: "spender", type: "address" },
    { name: "tokenId", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ]
}
var NonfungiblePositionManager = class _NonfungiblePositionManager {
  static INTERFACE = new Interface4(INonfungiblePositionManager.abi);
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  static encodeCreate(pool) {
    return _NonfungiblePositionManager.INTERFACE.encodeFunctionData("createAndInitializePoolIfNecessary", [
      pool.token0.address,
      pool.token1.address,
      pool.fee,
      toHex(pool.sqrtRatioX96)
    ])
  }
  static createCallParameters(pool) {
    return {
      calldata: this.encodeCreate(pool),
      value: toHex(0)
    }
  }
  static addCallParameters(position, options) {
    invariant12(jsbi_default.greaterThan(position.liquidity, ZERO), "ZERO_LIQUIDITY")
    const calldatas = []
    const { amount0: amount0Desired, amount1: amount1Desired } = position.mintAmounts
    const minimumAmounts = position.mintAmountsWithSlippage(options.slippageTolerance)
    const amount0Min = toHex(minimumAmounts.amount0)
    const amount1Min = toHex(minimumAmounts.amount1)
    const deadline = toHex(options.deadline)
    if (isMint(options) && options.createPool) {
      calldatas.push(this.encodeCreate(position.pool))
    }
    if (options.token0Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token0, options.token0Permit))
    }
    if (options.token1Permit) {
      calldatas.push(SelfPermit.encodePermit(position.pool.token1, options.token1Permit))
    }
    if (isMint(options)) {
      const recipient = validateAndParseAddress2(options.recipient)
      calldatas.push(
        _NonfungiblePositionManager.INTERFACE.encodeFunctionData("mint", [
          {
            token0: position.pool.token0.address,
            token1: position.pool.token1.address,
            fee: position.pool.fee,
            tickLower: position.tickLower,
            tickUpper: position.tickUpper,
            amount0Desired: toHex(amount0Desired),
            amount1Desired: toHex(amount1Desired),
            amount0Min,
            amount1Min,
            recipient,
            deadline
          }
        ])
      )
    } else {
      calldatas.push(
        _NonfungiblePositionManager.INTERFACE.encodeFunctionData("increaseLiquidity", [
          {
            tokenId: toHex(options.tokenId),
            amount0Desired: toHex(amount0Desired),
            amount1Desired: toHex(amount1Desired),
            amount0Min,
            amount1Min,
            deadline
          }
        ])
      )
    }
    let value = toHex(0)
    if (options.useNative) {
      const wrapped = options.useNative.wrapped
      invariant12(position.pool.token0.equals(wrapped) || position.pool.token1.equals(wrapped), "NO_WETH")
      const wrappedValue = position.pool.token0.equals(wrapped) ? amount0Desired : amount1Desired
      if (jsbi_default.greaterThan(wrappedValue, ZERO)) {
        calldatas.push(Payments.encodeRefundETH())
      }
      value = toHex(wrappedValue)
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value
    }
  }
  static encodeCollect(options) {
    const calldatas = []
    const tokenId = toHex(options.tokenId)
    const involvesETH = options.expectedCurrencyOwed0.currency.isNative || options.expectedCurrencyOwed1.currency.isNative
    const recipient = validateAndParseAddress2(options.recipient)
    calldatas.push(
      _NonfungiblePositionManager.INTERFACE.encodeFunctionData("collect", [
        {
          tokenId,
          recipient: involvesETH ? ADDRESS_ZERO : recipient,
          amount0Max: MaxUint128,
          amount1Max: MaxUint128
        }
      ])
    )
    if (involvesETH) {
      const ethAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed0.quotient : options.expectedCurrencyOwed1.quotient
      const token = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.currency : options.expectedCurrencyOwed0.currency
      const tokenAmount = options.expectedCurrencyOwed0.currency.isNative ? options.expectedCurrencyOwed1.quotient : options.expectedCurrencyOwed0.quotient
      calldatas.push(Payments.encodeUnwrapWETH9(ethAmount, recipient))
      calldatas.push(Payments.encodeSweepToken(token, tokenAmount, recipient))
    }
    return calldatas
  }
  static collectCallParameters(options) {
    const calldatas = _NonfungiblePositionManager.encodeCollect(options)
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    }
  }
  /**
   * Produces the calldata for completely or partially exiting a position
   * @param position The position to exit
   * @param options Additional information necessary for generating the calldata
   * @returns The call parameters
   */
  static removeCallParameters(position, options) {
    const calldatas = []
    const deadline = toHex(options.deadline)
    const tokenId = toHex(options.tokenId)
    const partialPosition = new Position({
      pool: position.pool,
      liquidity: options.liquidityPercentage.multiply(position.liquidity).quotient,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper
    })
    invariant12(jsbi_default.greaterThan(partialPosition.liquidity, ZERO), "ZERO_LIQUIDITY")
    const { amount0: amount0Min, amount1: amount1Min } = partialPosition.burnAmountsWithSlippage(
      options.slippageTolerance
    )
    if (options.permit) {
      calldatas.push(
        _NonfungiblePositionManager.INTERFACE.encodeFunctionData("permit", [
          validateAndParseAddress2(options.permit.spender),
          tokenId,
          toHex(options.permit.deadline),
          options.permit.v,
          options.permit.r,
          options.permit.s
        ])
      )
    }
    calldatas.push(
      _NonfungiblePositionManager.INTERFACE.encodeFunctionData("decreaseLiquidity", [
        {
          tokenId,
          liquidity: toHex(partialPosition.liquidity),
          amount0Min: toHex(amount0Min),
          amount1Min: toHex(amount1Min),
          deadline
        }
      ])
    )
    const { expectedCurrencyOwed0, expectedCurrencyOwed1, ...rest } = options.collectOptions
    calldatas.push(
      ..._NonfungiblePositionManager.encodeCollect({
        tokenId: toHex(options.tokenId),
        // add the underlying value to the expected currency already owed
        expectedCurrencyOwed0: expectedCurrencyOwed0.add(
          CurrencyAmount4.fromRawAmount(expectedCurrencyOwed0.currency, amount0Min)
        ),
        expectedCurrencyOwed1: expectedCurrencyOwed1.add(
          CurrencyAmount4.fromRawAmount(expectedCurrencyOwed1.currency, amount1Min)
        ),
        ...rest
      })
    )
    if (options.liquidityPercentage.equalTo(ONE)) {
      if (options.burnToken) {
        calldatas.push(_NonfungiblePositionManager.INTERFACE.encodeFunctionData("burn", [tokenId]))
      }
    } else {
      invariant12(options.burnToken !== true, "CANNOT_BURN")
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    }
  }
  static safeTransferFromParameters(options) {
    const recipient = validateAndParseAddress2(options.recipient)
    const sender = validateAndParseAddress2(options.sender)
    let calldata
    if (options.data) {
      calldata = _NonfungiblePositionManager.INTERFACE.encodeFunctionData(
        "safeTransferFrom(address,address,uint256,bytes)",
        [sender, recipient, toHex(options.tokenId), options.data]
      )
    } else {
      calldata = _NonfungiblePositionManager.INTERFACE.encodeFunctionData("safeTransferFrom(address,address,uint256)", [
        sender,
        recipient,
        toHex(options.tokenId)
      ])
    }
    return {
      calldata,
      value: toHex(0)
    }
  }
  // Prepare the params for an EIP712 signTypedData request
  static getPermitData(permit, positionManagerAddress, chainId) {
    return {
      domain: {
        name: "Uniswap V3 Positions NFT-V1",
        chainId,
        version: "1",
        verifyingContract: positionManagerAddress
      },
      types: NFT_PERMIT_TYPES,
      values: permit
    }
  }
}

// src/quoter.ts
import { Interface as Interface5 } from "@ethersproject/abi"
import { TradeType as TradeType2 } from "@uniswap/sdk-core"
import IQuoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"  with {type: "json"}
import IQuoterV2 from "@uniswap/swap-router-contracts/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json"  with {type: "json"}
import invariant13 from "tiny-invariant"
var SwapQuoter = class {
  static V1INTERFACE = new Interface5(IQuoter.abi);
  static V2INTERFACE = new Interface5(IQuoterV2.abi);
  /**
   * Produces the on-chain method name of the appropriate function within QuoterV2,
   * and the relevant hex encoded parameters.
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The swap route, a list of pools through which a swap can occur
   * @param amount The amount of the quote, either an amount in, or an amount out
   * @param tradeType The trade type, either exact input or exact output
   * @param options The optional params including price limit and Quoter contract switch
   * @returns The formatted calldata
   */
  static quoteCallParameters(route, amount, tradeType, options = {}) {
    const singleHop = route.pools.length === 1
    const quoteAmount = toHex(amount.quotient)
    let calldata
    const swapInterface = options.useQuoterV2 ? this.V2INTERFACE : this.V1INTERFACE
    if (singleHop) {
      const baseQuoteParams = {
        tokenIn: route.tokenPath[0].address,
        tokenOut: route.tokenPath[1].address,
        fee: route.pools[0].fee,
        sqrtPriceLimitX96: toHex(options?.sqrtPriceLimitX96 ?? 0)
      }
      const v2QuoteParams = {
        ...baseQuoteParams,
        ...tradeType === TradeType2.EXACT_INPUT ? { amountIn: quoteAmount } : { amount: quoteAmount }
      }
      const v1QuoteParams = [
        baseQuoteParams.tokenIn,
        baseQuoteParams.tokenOut,
        baseQuoteParams.fee,
        quoteAmount,
        baseQuoteParams.sqrtPriceLimitX96
      ]
      const tradeTypeFunctionName = tradeType === TradeType2.EXACT_INPUT ? "quoteExactInputSingle" : "quoteExactOutputSingle"
      calldata = swapInterface.encodeFunctionData(
        tradeTypeFunctionName,
        options.useQuoterV2 ? [v2QuoteParams] : v1QuoteParams
      )
    } else {
      invariant13(options?.sqrtPriceLimitX96 === void 0, "MULTIHOP_PRICE_LIMIT")
      const path = encodeRouteToPath(route, tradeType === TradeType2.EXACT_OUTPUT)
      const tradeTypeFunctionName = tradeType === TradeType2.EXACT_INPUT ? "quoteExactInput" : "quoteExactOutput"
      calldata = swapInterface.encodeFunctionData(tradeTypeFunctionName, [path, quoteAmount])
    }
    return {
      calldata,
      value: toHex(0)
    }
  }
}

// src/staker.ts
import { validateAndParseAddress as validateAndParseAddress3 } from "@uniswap/sdk-core"
import { defaultAbiCoder as defaultAbiCoder2, Interface as Interface6 } from "@ethersproject/abi"
import IUniswapV3Staker from "@uniswap/v3-staker/artifacts/contracts/UniswapV3Staker.sol/UniswapV3Staker.json" with {type: "json"}
var Staker = class _Staker {
  static INTERFACE = new Interface6(IUniswapV3Staker.abi);
  constructor() {
  }
  static INCENTIVE_KEY_ABI = "tuple(address rewardToken, address pool, uint256 startTime, uint256 endTime, address refundee)";
  /**
   *  To claim rewards, must unstake and then claim.
   * @param incentiveKey The unique identifier of a staking program.
   * @param options Options for producing the calldata to claim. Can't claim unless you unstake.
   * @returns The calldatas for 'unstakeToken' and 'claimReward'.
   */
  static encodeClaim(incentiveKey, options) {
    const calldatas = []
    calldatas.push(
      _Staker.INTERFACE.encodeFunctionData("unstakeToken", [
        this._encodeIncentiveKey(incentiveKey),
        toHex(options.tokenId)
      ])
    )
    const recipient = validateAndParseAddress3(options.recipient)
    const amount = options.amount ?? 0
    calldatas.push(
      _Staker.INTERFACE.encodeFunctionData("claimReward", [incentiveKey.rewardToken.address, recipient, toHex(amount)])
    )
    return calldatas
  }
  /**
   *
   * Note:  A `tokenId` can be staked in many programs but to claim rewards and continue the program you must unstake, claim, and then restake.
   * @param incentiveKeys An IncentiveKey or array of IncentiveKeys that `tokenId` is staked in.
   * Input an array of IncentiveKeys to claim rewards for each program.
   * @param options ClaimOptions to specify tokenId, recipient, and amount wanting to collect.
   * Note that you can only specify one amount and one recipient across the various programs if you are collecting from multiple programs at once.
   * @returns
   */
  static collectRewards(incentiveKeys, options) {
    incentiveKeys = Array.isArray(incentiveKeys) ? incentiveKeys : [incentiveKeys]
    let calldatas = []
    for (let i = 0; i < incentiveKeys.length; i++) {
      const incentiveKey = incentiveKeys[i]
      calldatas = calldatas.concat(this.encodeClaim(incentiveKey, options))
      calldatas.push(
        _Staker.INTERFACE.encodeFunctionData("stakeToken", [
          this._encodeIncentiveKey(incentiveKey),
          toHex(options.tokenId)
        ])
      )
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    }
  }
  /**
   *
   * @param incentiveKeys A list of incentiveKeys to unstake from. Should include all incentiveKeys (unique staking programs) that `options.tokenId` is staked in.
   * @param withdrawOptions Options for producing claim calldata and withdraw calldata. Can't withdraw without unstaking all programs for `tokenId`.
   * @returns Calldata for unstaking, claiming, and withdrawing.
   */
  static withdrawToken(incentiveKeys, withdrawOptions) {
    let calldatas = []
    incentiveKeys = Array.isArray(incentiveKeys) ? incentiveKeys : [incentiveKeys]
    const claimOptions = {
      tokenId: withdrawOptions.tokenId,
      recipient: withdrawOptions.recipient,
      amount: withdrawOptions.amount
    }
    for (let i = 0; i < incentiveKeys.length; i++) {
      const incentiveKey = incentiveKeys[i]
      calldatas = calldatas.concat(this.encodeClaim(incentiveKey, claimOptions))
    }
    const owner = validateAndParseAddress3(withdrawOptions.owner)
    calldatas.push(
      _Staker.INTERFACE.encodeFunctionData("withdrawToken", [
        toHex(withdrawOptions.tokenId),
        owner,
        withdrawOptions.data ? withdrawOptions.data : toHex(0)
      ])
    )
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(0)
    }
  }
  /**
   *
   * @param incentiveKeys A single IncentiveKey or array of IncentiveKeys to be encoded and used in the data parameter in `safeTransferFrom`
   * @returns An IncentiveKey as a string
   */
  static encodeDeposit(incentiveKeys) {
    incentiveKeys = Array.isArray(incentiveKeys) ? incentiveKeys : [incentiveKeys]
    let data
    if (incentiveKeys.length > 1) {
      const keys = []
      for (let i = 0; i < incentiveKeys.length; i++) {
        const incentiveKey = incentiveKeys[i]
        keys.push(this._encodeIncentiveKey(incentiveKey))
      }
      data = defaultAbiCoder2.encode([`${_Staker.INCENTIVE_KEY_ABI}[]`], [keys])
    } else {
      data = defaultAbiCoder2.encode([_Staker.INCENTIVE_KEY_ABI], [this._encodeIncentiveKey(incentiveKeys[0])])
    }
    return data
  }
  /**
   *
   * @param incentiveKey An `IncentiveKey` which represents a unique staking program.
   * @returns An encoded IncentiveKey to be read by ethers
   */
  static _encodeIncentiveKey(incentiveKey) {
    const { token0, token1, fee } = incentiveKey.pool
    const refundee = validateAndParseAddress3(incentiveKey.refundee)
    return {
      rewardToken: incentiveKey.rewardToken.address,
      pool: Pool.getAddress(token0, token1, fee),
      startTime: toHex(incentiveKey.startTime),
      endTime: toHex(incentiveKey.endTime),
      refundee
    }
  }
}

// src/swapRouter.ts
import { Interface as Interface7 } from "@ethersproject/abi"
import { CurrencyAmount as CurrencyAmount6, TradeType as TradeType3, validateAndParseAddress as validateAndParseAddress4 } from "@uniswap/sdk-core"
import invariant14 from "tiny-invariant"
import ISwapRouter from "@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json" with {type: "json"}
var SwapRouter = class _SwapRouter {
  static INTERFACE = new Interface7(ISwapRouter.abi);
  /**
   * Cannot be constructed.
   */
  constructor() {
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  static swapCallParameters(trades, options) {
    if (!Array.isArray(trades)) {
      trades = [trades]
    }
    const sampleTrade = trades[0]
    const tokenIn = sampleTrade.inputAmount.currency.wrapped
    const tokenOut = sampleTrade.outputAmount.currency.wrapped
    invariant14(
      trades.every((trade) => trade.inputAmount.currency.wrapped.equals(tokenIn)),
      "TOKEN_IN_DIFF"
    )
    invariant14(
      trades.every((trade) => trade.outputAmount.currency.wrapped.equals(tokenOut)),
      "TOKEN_OUT_DIFF"
    )
    const calldatas = []
    const ZERO_IN = CurrencyAmount6.fromRawAmount(trades[0].inputAmount.currency, 0)
    const ZERO_OUT = CurrencyAmount6.fromRawAmount(trades[0].outputAmount.currency, 0)
    const totalAmountOut = trades.reduce(
      (sum, trade) => sum.add(trade.minimumAmountOut(options.slippageTolerance)),
      ZERO_OUT
    )
    const mustRefund = sampleTrade.inputAmount.currency.isNative && sampleTrade.tradeType === TradeType3.EXACT_OUTPUT
    const inputIsNative = sampleTrade.inputAmount.currency.isNative
    const outputIsNative = sampleTrade.outputAmount.currency.isNative
    const routerMustCustody = outputIsNative || !!options.fee
    const totalValue = inputIsNative ? trades.reduce((sum, trade) => sum.add(trade.maximumAmountIn(options.slippageTolerance)), ZERO_IN) : ZERO_IN
    if (options.inputTokenPermit) {
      invariant14(sampleTrade.inputAmount.currency.isToken, "NON_TOKEN_PERMIT")
      calldatas.push(SelfPermit.encodePermit(sampleTrade.inputAmount.currency, options.inputTokenPermit))
    }
    const recipient = validateAndParseAddress4(options.recipient)
    const deadline = toHex(options.deadline)
    for (const trade of trades) {
      for (const { route, inputAmount, outputAmount } of trade.swaps) {
        const amountIn = toHex(trade.maximumAmountIn(options.slippageTolerance, inputAmount).quotient)
        const amountOut = toHex(trade.minimumAmountOut(options.slippageTolerance, outputAmount).quotient)
        const singleHop = route.pools.length === 1
        if (singleHop) {
          if (trade.tradeType === TradeType3.EXACT_INPUT) {
            const exactInputSingleParams = {
              tokenIn: route.tokenPath[0].address,
              tokenOut: route.tokenPath[1].address,
              fee: route.pools[0].fee,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline,
              amountIn,
              amountOutMinimum: amountOut,
              sqrtPriceLimitX96: toHex(options.sqrtPriceLimitX96 ?? 0)
            }
            calldatas.push(_SwapRouter.INTERFACE.encodeFunctionData("exactInputSingle", [exactInputSingleParams]))
          } else {
            const exactOutputSingleParams = {
              tokenIn: route.tokenPath[0].address,
              tokenOut: route.tokenPath[1].address,
              fee: route.pools[0].fee,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline,
              amountOut,
              amountInMaximum: amountIn,
              sqrtPriceLimitX96: toHex(options.sqrtPriceLimitX96 ?? 0)
            }
            calldatas.push(_SwapRouter.INTERFACE.encodeFunctionData("exactOutputSingle", [exactOutputSingleParams]))
          }
        } else {
          invariant14(options.sqrtPriceLimitX96 === void 0, "MULTIHOP_PRICE_LIMIT")
          const path = encodeRouteToPath(route, trade.tradeType === TradeType3.EXACT_OUTPUT)
          if (trade.tradeType === TradeType3.EXACT_INPUT) {
            const exactInputParams = {
              path,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline,
              amountIn,
              amountOutMinimum: amountOut
            }
            calldatas.push(_SwapRouter.INTERFACE.encodeFunctionData("exactInput", [exactInputParams]))
          } else {
            const exactOutputParams = {
              path,
              recipient: routerMustCustody ? ADDRESS_ZERO : recipient,
              deadline,
              amountOut,
              amountInMaximum: amountIn
            }
            calldatas.push(_SwapRouter.INTERFACE.encodeFunctionData("exactOutput", [exactOutputParams]))
          }
        }
      }
    }
    if (routerMustCustody) {
      if (!!options.fee) {
        if (outputIsNative) {
          calldatas.push(Payments.encodeUnwrapWETH9(totalAmountOut.quotient, recipient, options.fee))
        } else {
          calldatas.push(
            Payments.encodeSweepToken(
              sampleTrade.outputAmount.currency.wrapped,
              totalAmountOut.quotient,
              recipient,
              options.fee
            )
          )
        }
      } else {
        calldatas.push(Payments.encodeUnwrapWETH9(totalAmountOut.quotient, recipient))
      }
    }
    if (mustRefund) {
      calldatas.push(Payments.encodeRefundETH())
    }
    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: toHex(totalValue.quotient)
    }
  }
}
export {
  ADDRESS_ZERO,
  FACTORY_ADDRESS,
  FeeAmount,
  FullMath,
  LiquidityMath,
  Multicall,
  NoTickDataProvider,
  NonfungiblePositionManager,
  POOL_INIT_CODE_HASH,
  Payments,
  Pool,
  Position,
  PositionLibrary,
  Route,
  SelfPermit,
  SqrtPriceMath,
  Staker,
  SwapMath,
  SwapQuoter,
  SwapRouter,
  TICK_SPACINGS,
  Tick,
  TickLibrary,
  TickList,
  TickListDataProvider,
  TickMath,
  Trade,
  computePoolAddress,
  encodeRouteToPath,
  encodeSqrtRatioX96,
  isSorted,
  maxLiquidityForAmounts,
  mostSignificantBit,
  nearestUsableTick,
  poolInitCodeHash,
  priceToClosestTick,
  subIn256,
  tickToPrice,
  toHex,
  tradeComparator,
  v3Swap
};
/*! Bundled license information:

js-sha3/src/sha3.js:
  (**
   * [js-sha3]{@link https://github.com/emn178/js-sha3}
   *
   * @version 0.8.0
   * @author Chen, Yi-Cyuan [emn178@gmail.com]
   * @copyright Chen, Yi-Cyuan 2015-2018
   * @license MIT
   *)
*/

export default {
  /**
   * 保留2为小数.
   * @param value
   * @return {*}
   */
  decimal (value) {
    if (value) {
      return (Math.round(value * 100)) / 100
    } else {
      return value
    }
  }
}

export function spoofAuido() {
  // 保存原始的 AnalyserNode 原型方法
  // const OriginalAnalyserNode = window.AnalyserNode;
  // // 重写 getFloatFrequencyData 方法
  // OriginalAnalyserNode.prototype.getFloatFrequencyData = (function(originalFunc) {
  //     return function(array) {
  //         // 调用原始方法
  //         originalFunc.call(this, array);
  //         // 添加噪声
  //         for (let i = 0; i < array.length; i++) {
  //             array[i] += (Math.random() - 0.5) * 0.01; // 注入小幅度随机噪声
  //         }
  //     };
  // })(OriginalAnalyserNode.prototype.getFloatFrequencyData);
  // const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;
  //   Object.defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
  //     value: function () {
  //       // 调用原始的 resolvedOptions 方法
  //       const options = originalResolvedOptions.call(this);
  //       // 修改返回的时区
  //       options.timeZone = data.timezone || options.timeZone; // 你想要的自定义时区
  //       return options;
  //     },
  //     writable: true,
  //     configurable: true
  //   });
}

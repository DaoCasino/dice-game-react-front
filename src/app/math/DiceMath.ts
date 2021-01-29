export class DiceMath {
  static getPayoutOnWin(bet: number, number: number): number {
    return bet * DiceMath.getPayout(number)
  }

  static getPayout(number: number): number {
    return parseFloat(((1 / DiceMath.getWinChance(number)) * (1 - DiceMath.getHouseEdge())).toFixed(2))
  }

  static getWinChance(number: number): number {
    return DiceMath.getWinRange(number) / DiceMath.getAllRangeMax()
  }

  static getWinRange(number: number): number {
    return number * 100
  }

  static getAllRangeMax(): number {
    return 10000
  }

  static getHouseEdge(): number {
    return 0.01
  }
}

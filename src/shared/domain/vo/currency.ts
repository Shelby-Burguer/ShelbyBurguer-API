export enum CurrencyType {
  USD = 'USD',
  BSD = 'BSD',
}

export class Currency {
  constructor(
    private readonly value: number,
    private readonly type: CurrencyType,
  ) {
    if (value < 0) {
      throw new Error(`Invalid currency value: ${value}`);
    }
  }

  public getValue(): number {
    return this.value;
  }

  public getType(): CurrencyType {
    return this.type;
  }

  public add(currency: Currency): Currency {
    if (this.type !== currency.type) {
      throw new Error('Cannot add currencies of different types');
    }
    const newValue = this.value + currency.value;
    return new Currency(newValue, this.type);
  }

  public subtract(currency: Currency): Currency {
    if (this.type !== currency.type) {
      throw new Error('Cannot subtract currencies of different types');
    }
    const newValue = this.value - currency.value;
    if (newValue < 0) {
      throw new Error('Resulting currency value cannot be negative');
    }
    return new Currency(newValue, this.type);
  }
}

class DateParser {
  dateLastSeen: Date;
  private daysInMillis = 86400000;
  private hoursInMillis = 3600000;
  private minutesInMillis = 60000;

  constructor(dateLastSeen: Date) {
    this.dateLastSeen = dateLastSeen;
  }

  private calcTimeDiff() {
    return new Date().getTime() - this.dateLastSeen.getTime();
  }

  private calcDiffInDays() {
    return Math.floor(this.calcTimeDiff() / this.daysInMillis);
  }

  private calcDiffInHours() {
    return Math.floor(
      (this.calcTimeDiff() % this.daysInMillis) / this.hoursInMillis,
    );
  }

  private calcDiffInMinutes() {
    return Math.floor(
      ((this.calcTimeDiff() % this.daysInMillis) % this.hoursInMillis) /
        this.minutesInMillis,
    );
  }

  parseDate() {
    const timeDiff = this.calcTimeDiff();

    if (timeDiff >= this.daysInMillis) {
      return {
        dateUnit: "days",
        timeDiff: this.calcDiffInDays(),
      };
    } else if (timeDiff < this.daysInMillis && timeDiff > this.hoursInMillis) {
      return {
        dateUnit: "hours",
        timeDiff: this.calcDiffInHours(),
      };
    } else if (
      timeDiff < this.daysInMillis &&
      timeDiff < this.hoursInMillis &&
      timeDiff > this.minutesInMillis
    ) {
      const oneMinuteInMillis = 60000;
      const twoMinutesInMillis = oneMinuteInMillis * 2;
      return {
        dateUnit:
          timeDiff > oneMinuteInMillis && timeDiff < twoMinutesInMillis
            ? "minute"
            : "minutes",
        timeDiff: this.calcDiffInMinutes(),
      };
    }
  }
}

export default DateParser;

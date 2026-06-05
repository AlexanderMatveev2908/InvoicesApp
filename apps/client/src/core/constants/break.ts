export class Breakpoints {
  public static mobile: number = 375;
  public static tablet: number = 768;
  public static desktop: number = 1440;

  public static isMobile(): boolean {
    try {
      return window.innerWidth < this.tablet;
    } catch (error) {
      return true;
    }
  }

  public static isTablet(): boolean {
    try {
      return window.innerWidth >= this.tablet && window.innerWidth < this.desktop;
    } catch (error) {
      return false;
    }
  }

  public static isDesktop(): boolean {
    try {
      return window.innerWidth >= this.desktop;
    } catch (error) {
      return false;
    }
  }
}

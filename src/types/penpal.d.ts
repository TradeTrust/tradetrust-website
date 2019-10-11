// https://github.com/Aaronius/penpal/releases/tag/v4.0.0 check TypeScript Declarations
declare module "penpal/lib/connectToChild" {
  interface ConnectToChildOptions {
    methods: {
      [key: string]: Function;
    };
    iframe: HTMLIFrameElement | null;
  }
  interface ConnectToChildReturn {
    promise: Promise<{ [key: string]: Function }>;
  }
  export = (options: ConnectToChildOptions): ConnectToChildReturn => {};
}

import{j as e}from"./index-DrhACB-D.js";import{O as i,c as o,d as a}from"./Upload-ChF5xKSK.js";import{r as x}from"./index-DQDNmYQF.js";import{useMDXComponents as w}from"./index-DmqVK_gK.js";import{S as u}from"./docs-CJ9d-umt.js";import"./index-BGiqdwja.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const l=n=>{const[t,r]=x.useState(0),d=[{label:"Cart",content:e.jsx("p",{children:"Review your shopping cart. Ensure all items are correct before proceeding to checkout."}),icon:e.jsx(a,{name:"ShoppingCart"}),buttonContent:e.jsxs(e.Fragment,{children:[e.jsx(o,{label:"Apply Coupon",variant:"outlined",color:"secondary"}),e.jsx(o,{label:"Update Cart",variant:"outlined",color:"secondary"})]}),handleStepForward:()=>r(t+1)},{label:"Delivery Address",content:e.jsx("p",{children:"Provide or confirm your delivery address. Make sure it's accurate to avoid shipping issues."}),icon:e.jsx(a,{name:"LocationOn"}),buttonContent:e.jsx(o,{label:"Save Address",variant:"outlined",color:"secondary"}),buttonBackLabel:"Back to Cart",buttonNextLabel:"Proceed to Payment",handleStepBack:()=>r(t-1),handleStepForward:()=>r(t+1)},{label:"Payment Method",content:e.jsx("p",{children:"Select a payment method to complete your purchase. Supported methods include Credit/Debit Card, PayPal, and more."}),icon:e.jsx(a,{name:"CreditCard"}),buttonContent:e.jsx(o,{label:"Save Payment",variant:"outlined",color:"secondary"}),buttonBackLabel:"Back to Address",buttonNextLabel:"Preview Order",handleStepBack:()=>r(t-1),handleStepForward:()=>r(t+1)},{label:"Preview Order",content:e.jsx("p",{children:"Review your order details including items, delivery address, and payment method before placing your order."}),icon:e.jsx(a,{name:"Assignment"}),buttonContent:e.jsx(o,{label:"Place Order",variant:"contained",color:"primary"}),buttonBackLabel:"Back to Payment",buttonNextLabel:"Finish Order",handleStepBack:()=>r(t-1),handleStepForward:()=>r(t+1)},{label:"Order Complete",content:e.jsx("p",{children:"Thank you for your purchase! Your order has been placed successfully."}),icon:e.jsx(a,{name:"ShoppingCartCheckout"}),buttonContent:e.jsx(o,{label:"View Order",variant:"outlined",color:"primary"}),buttonBackLabel:"Back to Preview",handleStepBack:()=>r(t-1)}];return e.jsx(i,{labelPosition:"alternative",currentStep:t,steps:d,...n})},c=n=>{const[t,r]=x.useState(0),d=[{label:"Cart",content:e.jsx("p",{children:"Review your shopping cart. Ensure all items are correct before proceeding to checkout."}),icon:e.jsx(a,{name:"ShoppingCart"}),buttonContent:e.jsxs(e.Fragment,{children:[e.jsx(o,{label:"Apply Coupon",variant:"outlined",color:"secondary"}),e.jsx(o,{label:"Update Cart",variant:"outlined",color:"secondary"})]}),handleStepForward:()=>r(t+1)},{label:"Delivery Address",content:e.jsx("p",{children:"Provide or confirm your delivery address. Make sure it's accurate to avoid shipping issues."}),icon:e.jsx(a,{name:"LocationOn"}),buttonContent:e.jsx(o,{label:"Save Address",variant:"outlined",color:"secondary"}),buttonBackLabel:"Back to Cart",buttonNextLabel:"Proceed to Payment",handleStepBack:()=>r(t-1),handleStepForward:()=>r(t+1)},{label:"Payment Method",content:e.jsx("p",{children:"Select a payment method to complete your purchase. Supported methods include Credit/Debit Card, PayPal, and more."}),icon:e.jsx(a,{name:"CreditCard"}),buttonContent:e.jsx(o,{label:"Save Payment",variant:"outlined",color:"secondary"}),buttonBackLabel:"Back to Address",buttonNextLabel:"Preview Order",handleStepBack:()=>r(t-1),handleStepForward:()=>r(t+1)},{label:"Preview Order",content:e.jsx("p",{children:"Review your order details including items, delivery address, and payment method before placing your order."}),icon:e.jsx(a,{name:"Assignment"}),buttonContent:e.jsx(o,{label:"Place Order",variant:"contained",color:"primary"}),buttonBackLabel:"Back to Payment",buttonNextLabel:"Finish Order",handleStepBack:()=>r(t-1),handleStepForward:()=>r(t+1)},{label:"Order Complete",content:e.jsx("p",{children:"Thank you for your purchase! Your order has been placed successfully."}),icon:e.jsx(a,{name:"ShoppingCartCheckout"}),buttonContent:e.jsx(o,{label:"View Order",variant:"outlined",color:"primary"}),buttonBackLabel:"Back to Preview",handleStepBack:()=>r(t-1)}],k=[1,2,3];return e.jsx(i,{labelPosition:"alternative",currentStep:t,steps:d,stepSelectorEnabled:!0,allowedSteps:k,setCurrentStep:r,...n})};try{l.displayName="StepperExample",l.__docgenInfo={description:`StepperExample Component

Demonstrates a multi-step process using the Stepper component.
Includes steps for Cart, Delivery Address, Payment, Order Preview, and Order Completion.`,displayName:"StepperExample",props:{}}}catch{}try{c.displayName="StepperStepSelectExample",c.__docgenInfo={description:"",displayName:"StepperStepSelectExample",props:{}}}catch{}const S={stepper:[{language:"jsx",snippet:`
            <Stepper
                labelPosition="alternative"
                currentStep={currentStep}
                steps={steps}
            />
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Button } from '../Button';
            import { Stepper } from './Stepper';

            export const StepperExample = (props) => {
                const [currentStep, setCurrentStep] = useState(0);
                const [disablePrev, setDisablePrev] = useState(false);
                const [disableForward, setDisableForward] = useState(true);

                const steps= [
                    {
                        label: 'Cart',
                        content: <p>Cart content... </p>,
                        icon: <Icon name="ShoppingBasket" />,
                        buttonContent: (
                            <>
                                <Button label="Step 1" variant="outlined" color="primary" />
                                <Button label="Step 1" variant="outlined" color="primary" />
                            </>
                        ),
                        optional: true,
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Delivery Address',
                        content: <p>Delivery address content...</p>,
                        icon: <Icon name="ShoppingBasket" />,
                        buttonContent: <Button label="Step 2" />,
                        buttonBackLabel: 'Step 1',
                        buttonNextLabel: 'Step 3',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: ' ',
                        content: <p>Payment method content...</p>,
                        buttonContent: <Button label="STep 3" />,
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Preview',
                        icon: <Icon name="ShoppingBasket" />,
                        content: <p>Preview content...</p>,
                        buttonContent: <Button label="Step 4" />,
                        // disableNext: true,
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Finish Order',
                        icon: <Icon name="ShoppingBasket" />,
                        content: <p>Finish order content...</p>,
                        buttonContent: <Button label="Step 5" />,
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                    },
                ];

                return (
                    <Stepper
                        labelPosition="alternative"
                        currentStep={currentStep}
                        handleStepBack={() => setCurrentStep(currentStep - 1)}
                        handleStepForward={() => setCurrentStep(currentStep + 1)}
                        steps={steps}
                    />
                );
            };
            `},{language:"tsx",snippet:`
            <Stepper
                labelPosition="alternative"
                currentStep={currentStep}
                handleStepBack={() => setCurrentStep(currentStep - 1)}
                handleStepForward={() => setCurrentStep(currentStep + 1)}
                steps={steps}
            />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Button } from '../Button';
            import { IStep, Stepper } from './Stepper';

            export const StepperExample: FC = (props: any) => {
                const [currentStep, setCurrentStep] = useState<number>(0);

                const steps: Array<IStep> = [
                    {
                        label: 'Cart',
                        content: <p>Cart content... </p>,
                        icon: <Icon name="ShoppingBasket" />,
                        buttonContent: (
                            <>
                                <Button label="Step 1" variant="outlined" color="primary" />
                                <Button label="Step 1" variant="outlined" color="primary" />
                            </>
                        ),
                        optional: true,
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Delivery Address',
                        content: <p>Delivery address content...</p>,
                        icon: <Icon name="ShoppingBasket" />,
                        buttonContent: <Button label="Step 2" />,
                        buttonBackLabel: 'Step 1',
                        buttonNextLabel: 'Step 3',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: ' ',
                        content: <p>Payment method content...</p>,
                        buttonContent: <Button label="STep 3" />,
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Preview',
                        icon: <Icon name="ShoppingBasket" />,
                        content: <p>Preview content...</p>,
                        buttonContent: <Button label="Step 4" />,
                        // disableNext: true,
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Finish Order',
                        icon: <Icon name="ShoppingBasket" />,
                        content: <p>Finish order content...</p>,
                        buttonContent: <Button label="Step 5" />,
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                    },
                ];
            
                return (
                    <Stepper
                        labelPosition="alternative"
                        currentStep={currentStep}
                        steps={steps}
                    />
                );
            };
            `}],selectStepStepper:[{language:"jsx",snippet:`
                    <Stepper
                        labelPosition="alternative"
                        currentStep={currentStep}
                        steps={steps}
                        stepSelectorEnabled
                        allowedSteps={allowedSteps}
                        setCurrentStep={setCurrentStep}
                        {...props}
                    />
            `,expandedSnippet:`
            import React, { useState } from 'react';
            import { Button } from '../Button';
            import { Stepper } from './Stepper';

           
            export const StepperStepSelectExample: FC = (props: any) => {
                const [currentStep, setCurrentStep] = useState<number>(0);

                const steps: Array<StepProps> = [
                    {
                        label: 'Cart',
                        content: (
                            <p>
                                Review your shopping cart. Ensure all items are correct before
                                proceeding to checkout.
                            </p>
                        ),
                        icon: <Icon name="ShoppingCart" />,
                        buttonContent: (
                            <>
                                <Button label="Apply Coupon" variant="outlined" color="secondary" />
                                <Button label="Update Cart" variant="outlined" color="secondary" />
                            </>
                        ),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Delivery Address',
                        content: (
                            <p>
                                Provide or confirm your delivery address. Make sure it's accurate to
                                avoid shipping issues.
                            </p>
                        ),
                        icon: <Icon name="LocationOn" />,
                        buttonContent: (
                            <Button label="Save Address" variant="outlined" color="secondary" />
                        ),
                        buttonBackLabel: 'Back to Cart',
                        buttonNextLabel: 'Proceed to Payment',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Payment Method',
                        content: (
                            <p>
                                Select a payment method to complete your purchase. Supported methods
                                include Credit/Debit Card, PayPal, and more.
                            </p>
                        ),
                        icon: <Icon name="CreditCard" />,
                        buttonContent: (
                            <Button label="Save Payment" variant="outlined" color="secondary" />
                        ),
                        buttonBackLabel: 'Back to Address',
                        buttonNextLabel: 'Preview Order',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Preview Order',
                        content: (
                            <p>
                                Review your order details including items, delivery address, and
                                payment method before placing your order.
                            </p>
                        ),
                        icon: <Icon name="Assignment" />,
                        buttonContent: (
                            <Button label="Place Order" variant="contained" color="primary" />
                        ),
                        buttonBackLabel: 'Back to Payment',
                        buttonNextLabel: 'Finish Order',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Order Complete',
                        content: (
                            <p>
                                Thank you for your purchase! Your order has been placed successfully.
                            </p>
                        ),
                        icon: <Icon name="ShoppingCartCheckout" />,
                        buttonContent: (
                            <Button label="View Order" variant="outlined" color="primary" />
                        ),
                        buttonBackLabel: 'Back to Preview',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                    },
                ];

                const allowedSteps = [1, 2, 3];

                return (
                    <Stepper
                        labelPosition="alternative"
                        currentStep={currentStep}
                        steps={steps}
                        stepSelectorEnabled
                        allowedSteps={allowedSteps}
                        setCurrentStep={setCurrentStep}
                        {...props}
                    />
                );
            };
            `},{language:"tsx",snippet:`
                    <Stepper
                        labelPosition="alternative"
                        currentStep={currentStep}
                        steps={steps}
                        stepSelectorEnabled
                        allowedSteps={allowedSteps}
                        setCurrentStep={setCurrentStep}
                        {...props}
                    />
            `,expandedSnippet:`
            import React, { FC, useState } from 'react';
            import { Button } from '../Button';
            import { IStep, Stepper } from './Stepper';

                        
            export const StepperStepSelectExample: FC = (props: any) => {
                const [currentStep, setCurrentStep] = useState<number>(0);

                const steps: Array<StepProps> = [
                    {
                        label: 'Cart',
                        content: (
                            <p>
                                Review your shopping cart. Ensure all items are correct before
                                proceeding to checkout.
                            </p>
                        ),
                        icon: <Icon name="ShoppingCart" />,
                        buttonContent: (
                            <>
                                <Button label="Apply Coupon" variant="outlined" color="secondary" />
                                <Button label="Update Cart" variant="outlined" color="secondary" />
                            </>
                        ),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Delivery Address',
                        content: (
                            <p>
                                Provide or confirm your delivery address. Make sure it's accurate to
                                avoid shipping issues.
                            </p>
                        ),
                        icon: <Icon name="LocationOn" />,
                        buttonContent: (
                            <Button label="Save Address" variant="outlined" color="secondary" />
                        ),
                        buttonBackLabel: 'Back to Cart',
                        buttonNextLabel: 'Proceed to Payment',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Payment Method',
                        content: (
                            <p>
                                Select a payment method to complete your purchase. Supported methods
                                include Credit/Debit Card, PayPal, and more.
                            </p>
                        ),
                        icon: <Icon name="CreditCard" />,
                        buttonContent: (
                            <Button label="Save Payment" variant="outlined" color="secondary" />
                        ),
                        buttonBackLabel: 'Back to Address',
                        buttonNextLabel: 'Preview Order',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Preview Order',
                        content: (
                            <p>
                                Review your order details including items, delivery address, and
                                payment method before placing your order.
                            </p>
                        ),
                        icon: <Icon name="Assignment" />,
                        buttonContent: (
                            <Button label="Place Order" variant="contained" color="primary" />
                        ),
                        buttonBackLabel: 'Back to Payment',
                        buttonNextLabel: 'Finish Order',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                        handleStepForward: () => setCurrentStep(currentStep + 1),
                    },
                    {
                        label: 'Order Complete',
                        content: (
                            <p>
                                Thank you for your purchase! Your order has been placed successfully.
                            </p>
                        ),
                        icon: <Icon name="ShoppingCartCheckout" />,
                        buttonContent: (
                            <Button label="View Order" variant="outlined" color="primary" />
                        ),
                        buttonBackLabel: 'Back to Preview',
                        handleStepBack: () => setCurrentStep(currentStep - 1),
                    },
                ];

                const allowedSteps = [1, 2, 3];

                return (
                    <Stepper
                        labelPosition="alternative"
                        currentStep={currentStep}
                        steps={steps}
                        stepSelectorEnabled
                        allowedSteps={allowedSteps}
                        setCurrentStep={setCurrentStep}
                        {...props}
                    />
                );
            };
                        `}]};function b(n){return e.jsxs("div",{className:"content",children:[e.jsxs("h1",{children:["Stepper v",void 0]}),e.jsx("p",{children:"UI Element that creates a stepper component."}),e.jsx("hr",{}),e.jsx("h3",{children:"Basic usage"}),e.jsx(u,{snippets:S.stepper,children:e.jsx(l,{})}),e.jsx("h3",{children:"Select step out of order"}),e.jsx(u,{snippets:S.selectStepStepper,children:e.jsx(c,{})})]})}function P(n={}){const{wrapper:t}={...w(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(b,{...n})}):b()}const E={title:"UnifiedUI/Stepper",component:i,parameters:{docs:{page:P}}},p={render:n=>e.jsx(l,{...n})},s={render:n=>e.jsx(c,{...n})};var m,h,C;p.parameters={...p.parameters,docs:{...(m=p.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => <StepperExample {...args} />
}`,...(C=(h=p.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var y,B,v;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: (args: any) => <StepperStepSelectExample {...args} />
}`,...(v=(B=s.parameters)==null?void 0:B.docs)==null?void 0:v.source}}};const N=["BaseStepper","SelectStepStepper"];export{p as BaseStepper,s as SelectStepStepper,N as __namedExportsOrder,E as default};

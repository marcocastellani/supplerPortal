import{j as e}from"./index-DrhACB-D.js";import{useMDXComponents as x}from"./index-DmqVK_gK.js";import{M as F}from"./index-C2q6YL-H.js";import{S as r}from"./docs-CJ9d-umt.js";import{u as s,f as g,c as n,g as S,U as y,D as j,R as k,h as w,i as N}from"./Upload-ChF5xKSK.js";import"./index-DQDNmYQF.js";import"./index-BGiqdwja.js";import"./iframe-Bt9kuzT5.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./theming-C7i7v1dL.js";import"./tiny-invariant-CopsF_GD.js";const c=()=>{const{control:o,handleSubmit:t}=s({defaultValues:{input:"Careful, this is invalid..."}}),l=({input:a})=>{alert(a)};return e.jsx("form",{onSubmit:t(l),style:{width:"100%"},children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(g,{name:"input",label:"Email address",placeholder:"Email address",fullWidth:!0,useForm:!0,helperText:"Enter a valid email",control:o,rules:{required:"This field is required!",pattern:{value:/[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,message:"Not a valid email address!"}}})}),e.jsx("div",{className:"col-md-12",children:e.jsx(n,{label:"Submit form",variant:"contained",color:"primary",fullWidth:!0,type:"submit"})})]})})},d=()=>{const{control:o,handleSubmit:t}=s({defaultValues:{select:{label:"Austria",value:"1"}}}),l=({select:a})=>{alert(a==null?void 0:a.label)};return e.jsx("form",{onSubmit:t(l),style:{width:"100%"},children:e.jsxs("div",{className:"row gap-2",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(S,{name:"select",label:"Select country",options:[{label:"Austria",value:"1"},{label:"Belgium",value:"2"},{label:"Croatia",value:"3"}],fullWidth:!0,useForm:!0,useAutocomplete:!0,rules:{required:"No country specified"},control:o})}),e.jsx("div",{className:"col-md-12",children:e.jsx(n,{label:"Submit form",variant:"contained",color:"primary",fullWidth:!0,type:"submit"})})]})})},m=()=>{const{control:o,handleSubmit:t}=s({defaultValues:{upload:[]}}),l=({upload:a})=>{alert(JSON.stringify(a))};return e.jsx("form",{onSubmit:t(l),style:{width:"100%"},children:e.jsxs("div",{className:"row gap-2",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(y,{name:"upload",multiple:!0,uploadLabel:"Click or drag to upload a file (.png, .jpg allowed)",allowedFormats:[".png",".jpg"],useForm:!0,control:o})}),e.jsx("div",{className:"col-md-12",children:e.jsx(n,{label:"Submit form",variant:"contained",color:"primary",fullWidth:!0,type:"submit"})})]})})},u=()=>{const{control:o,handleSubmit:t}=s({defaultValues:{datepicker:""}}),l=({datepicker:a})=>{alert(a)};return e.jsx("form",{onSubmit:t(l),style:{width:"100%"},children:e.jsxs("div",{className:"row gap-2",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(j,{name:"datepicker",useForm:!0,control:o})}),e.jsx("div",{className:"col-md-12",children:e.jsx(n,{label:"Submit form",variant:"contained",color:"primary",fullWidth:!0,type:"submit"})})]})})},p=()=>{const{control:o,handleSubmit:t}=s({defaultValues:{radiogroup:""}}),l=({radiogroup:a})=>{alert(a)};return e.jsx("form",{onSubmit:t(l),style:{width:"100%"},children:e.jsxs("div",{className:"row gap-2",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(k,{name:"radiogroup",options:[{label:"Option1",value:"1"},{label:"Option2",value:"2"}],direction:"row",useForm:!0,control:o})}),e.jsx("div",{className:"col-md-12",children:e.jsx(n,{label:"Submit form",variant:"contained",color:"primary",fullWidth:!0,type:"submit"})})]})})},h=()=>{const{control:o,handleSubmit:t}=s({defaultValues:{checkbox:!0}}),l=({checkbox:a})=>{alert(a)};return e.jsx("form",{onSubmit:t(l),style:{width:"100%"},children:e.jsxs("div",{className:"row gap-2",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(w,{name:"checkbox",label:"Is react-hook-form amazing?",useForm:!0,control:o})}),e.jsx("div",{className:"col-md-12",children:e.jsx(n,{label:"Submit form",variant:"contained",color:"primary",fullWidth:!0,type:"submit"})})]})})},b=()=>{const{control:o,handleSubmit:t}=s({defaultValues:{_switch:!0}}),l=({_switch:a})=>{alert(a)};return e.jsx("form",{onSubmit:t(l),style:{width:"100%"},children:e.jsxs("div",{className:"row gap-2",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(N,{name:"_switch",label:"I will use it!",useForm:!0,control:o})}),e.jsx("div",{className:"col-md-12",children:e.jsx(n,{label:"Submit form",variant:"contained",color:"primary",fullWidth:!0,type:"submit"})})]})})},f=()=>{const{control:o,handleSubmit:t}=s({defaultValues:{input:"Careful, this is invalid...",select:"Croatia",upload:[],datepicker:"",radiogroup:"1",checkbox:!1,switch:!0}}),l=a=>{alert(JSON.stringify(a))};return e.jsx("form",{onSubmit:t(l),children:e.jsxs("div",{className:"row gap-2",children:[e.jsx("div",{className:"col-md-12",children:e.jsx(g,{name:"input",label:"Email address",placeholder:"Email address",fullWidth:!0,useForm:!0,helperText:"Enter a valid email",control:o,rules:{pattern:{value:/[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,message:"Not a valid email address!"}}})}),e.jsx("div",{className:"col-md-12",children:e.jsx(S,{name:"select",label:"Select country",options:[{label:"Austria",value:"Austria"},{label:"Belgium",value:"Belgium"},{label:"Croatia",value:"Croatia"}],fullWidth:!0,useForm:!0,rules:{required:!0},control:o})}),e.jsx("div",{className:"col-md-12",children:e.jsx(y,{name:"upload",multiple:!0,uploadLabel:"Click or drag to upload a file",allowedFormats:[".png"],useForm:!0,control:o})}),e.jsx("div",{className:"col-md-12",children:e.jsx(j,{name:"datepicker",useForm:!0,control:o})}),e.jsx("div",{className:"col-md-4",children:e.jsx(k,{name:"radiogroup",options:[{label:"Option1",value:"1"},{label:"Option2",value:"2"}],direction:"row",useForm:!0,control:o})}),e.jsx("div",{className:"col-md-4",children:e.jsx(w,{name:"checkbox",label:"Is react-hook-form amazing?",useForm:!0,control:o})}),e.jsx("div",{className:"col-md-3",children:e.jsx(N,{name:"switch",label:"I will use it!",useForm:!0,control:o})}),e.jsx("div",{className:"col-md-12",children:e.jsx(n,{label:"Submit form",variant:"contained",color:"primary",fullWidth:!0,type:"submit"})})]})})};try{c.displayName="InputExample",c.__docgenInfo={description:"",displayName:"InputExample",props:{}}}catch{}try{d.displayName="SelectExample",d.__docgenInfo={description:"",displayName:"SelectExample",props:{}}}catch{}try{m.displayName="UploadExample",m.__docgenInfo={description:"",displayName:"UploadExample",props:{}}}catch{}try{u.displayName="DatePickerExample",u.__docgenInfo={description:"",displayName:"DatePickerExample",props:{}}}catch{}try{p.displayName="RadioGroupExample",p.__docgenInfo={description:"",displayName:"RadioGroupExample",props:{}}}catch{}try{h.displayName="CheckboxExample",h.__docgenInfo={description:"",displayName:"CheckboxExample",props:{}}}catch{}try{b.displayName="SwitchExample",b.__docgenInfo={description:"",displayName:"SwitchExample",props:{}}}catch{}try{f.displayName="FormExample",f.__docgenInfo={description:"",displayName:"FormExample",props:{}}}catch{}const i={input:[{language:"jsx",snippet:`
			<Input
				name="input"
				label="Email address"
				placeholder="Email address"
				fullWidth
				useForm
				helperText="Enter a valid email"
				control={control}
				rules={{
					required: 'This field is required!',
					pattern: {
						value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,
						message: 'Not a valid email address!',
					},
				}}
			/>
			`,expandedSnippet:`
			import { useForm } from 'react-hook-form';
			import { Input } from '../Input';
			
			export const InputExample = () => {
				const { control, handleSubmit } = useForm({
					defaultValues: {
						input: 'Careful, this is invalid...',
					},
				});
			
				const onSubmit = ({ input }) => {
					alert(input);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row">
							<div className="col-md-12">
								<Input
									name="input"
									label="Email address"
									placeholder="Email address"
									fullWidth
									useForm
									helperText="Enter a valid email"
									control={control}
									rules={{
										required: 'This field is required!',
										pattern: {
											value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,
											message: 'Not a valid email address!',
										},
									}}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`},{language:"tsx",snippet:`
			<Input
				name="input"
				label="Email address"
				placeholder="Email address"
				fullWidth
				useForm
				helperText="Enter a valid email"
				control={control}
				rules={{
					required: 'This field is required!',
					pattern: {
						value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,
						message: 'Not a valid email address!',
					},
				}}
			/>
			`,expandedSnippet:`
			import { SubmitHandler, useForm } from 'react-hook-form';
			import { Input } from '../Input';
			
			export const InputExample: FC = () => {
				const { control, handleSubmit } = useForm<{ input: string }>({
					defaultValues: {
						input: 'Careful, this is invalid...',
					},
				});
			
				const onSubmit: SubmitHandler<{ input: string }> = ({ input }) => {
					alert(input);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row">
							<div className="col-md-12">
								<Input
									name="input"
									label="Email address"
									placeholder="Email address"
									fullWidth
									useForm
									helperText="Enter a valid email"
									control={control}
									rules={{
										required: 'This field is required!',
										pattern: {
											value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,
											message: 'Not a valid email address!',
										},
									}}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`}],select:[{language:"jsx",snippet:`
			<Select
				name="select"
				label="Select country"
				options={[
					{
						label: 'Austria',
						value: 'Austria',
					},
					{
						label: 'Belgium',
						value: 'Belgium',
					},
					{
						label: 'Croatia',
						value: 'Croatia',
					},
				]}
				fullWidth
				useForm
				control={control}
			/>`,expandedSnippet:`
			import { useForm } from 'react-hook-form';
			import { Select } from '../Select';
			
			export const SelectExample = () => {
				const { control, handleSubmit } = useForm({
					defaultValues: {
						select: 'Austria',
					},
				});
			
				const onSubmit = ({ select }) => {
					alert(select);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Select
									name="select"
									label="Select country"
									options={[
										{
											label: 'Austria',
											value: 'Austria',
										},
										{
											label: 'Belgium',
											value: 'Belgium',
										},
										{
											label: 'Croatia',
											value: 'Croatia',
										},
									]}
									fullWidth
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`},{language:"tsx",snippet:`
			<Select
				name="select"
				label="Select country"
				options={[
					{
						label: 'Austria',
						value: 'Austria',
					},
					{
						label: 'Belgium',
						value: 'Belgium',
					},
					{
						label: 'Croatia',
						value: 'Croatia',
					},
				]}
				fullWidth
				useForm
				control={control}
			/>`,expandedSnippet:`
			import { SubmitHandler, useForm } from 'react-hook-form';
			import { Select } from '../Select';
			
			export const SelectExample: FC = () => {
				const { control, handleSubmit } = useForm<{ select: string }>({
					defaultValues: {
						select: 'Austria',
					},
				});
			
				const onSubmit: SubmitHandler<{ select: string }> = ({ select }) => {
					alert(select);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Select
									name="select"
									label="Select country"
									options={[
										{
											label: 'Austria',
											value: 'Austria',
										},
										{
											label: 'Belgium',
											value: 'Belgium',
										},
										{
											label: 'Croatia',
											value: 'Croatia',
										},
									]}
									fullWidth
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`}],upload:[{language:"jsx",snippet:`
			<Upload
				name="upload"
				multiple
				uploadLabel="Click or drag to upload a file (.png, .jpg allowed)"
				allowedFormats={['.png', '.jpg']}
				useForm
				control={control}
			/>`,expandedSnippet:`
			import { useForm } from 'react-hook-form';
			import { Upload } from '../Upload';

			export const UploadExample = () => {
				const { control, handleSubmit } = useForm({
					defaultValues: {
						upload: [],
					},
				});
			
				const onSubmit = ({ upload }) => {
					alert(JSON.stringify(upload));
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Upload
									name="upload"
									multiple
									uploadLabel="Click or drag to upload a file (.png, .jpg allowed)"
									allowedFormats={['.png', '.jpg']}
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`},{language:"tsx",snippet:`
			<Upload
				name="upload"
				multiple
				uploadLabel="Click or drag to upload a file (.png, .jpg allowed)"
				allowedFormats={['.png', '.jpg']}
				useForm
				control={control}
			/>`,expandedSnippet:`
			import { SubmitHandler, useForm } from 'react-hook-form';
			import { Upload } from '../Upload';

			export const UploadExample: FC = () => {
				const { control, handleSubmit } = useForm<{ upload: File[] }>({
					defaultValues: {
						upload: [],
					},
				});
			
				const onSubmit: SubmitHandler<{ upload: File[] }> = ({ upload }) => {
					alert(JSON.stringify(upload));
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Upload
									name="upload"
									multiple
									uploadLabel="Click or drag to upload a file (.png, .jpg allowed)"
									allowedFormats={['.png', '.jpg']}
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`}],datePicker:[{language:"jsx",snippet:`
			<DatePicker name="datepicker" useForm control={control} />
			`,expandedSnippet:`
			import { useForm } from 'react-hook-form';
			import { DatePicker } from '../DatePicker';

			export const DatePickerExample = () => {
				const { control, handleSubmit } = useForm({
					defaultValues: {
						datepicker: '',
					},
				});
			
				const onSubmit = ({ datepicker }) => {
					alert(datepicker);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<DatePicker name="datepicker" useForm control={control} />
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`},{language:"tsx",snippet:`
			<DatePicker name="datepicker" useForm control={control} />
			`,expandedSnippet:`
			import { SubmitHandler, useForm } from 'react-hook-form';
			import { DatePicker } from '../DatePicker';

			export const DatePickerExample: FC = () => {
				const { control, handleSubmit } = useForm<{ datepicker: string }>({
					defaultValues: {
						datepicker: '',
					},
				});
			
				const onSubmit: SubmitHandler<{ datepicker: string }> = ({ datepicker }) => {
					alert(datepicker);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<DatePicker name="datepicker" useForm control={control} />
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`}],radioGroup:[{language:"jsx",snippet:`
			<RadioGroup
				name="radiogroup"
				options={[
					{
						label: 'Option1',
						value: '1',
					},
					{
						label: 'Option2',
						value: '2',
					},
				]}
				direction="row"
				useForm
				control={control}
			/>`,expandedSnippet:`
			import { useForm } from 'react-hook-form';
			import { RadioGroup } from '../RadioGroup';

			export const RadioGroupExample= () => {
				const { control, handleSubmit } = useForm({
					defaultValues: {
						radiogroup: '',
					},
				});
			
				const onSubmit = ({ radiogroup }) => {
					alert(radiogroup);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<RadioGroup
									name="radiogroup"
									options={[
										{
											label: 'Option1',
											value: '1',
										},
										{
											label: 'Option2',
											value: '2',
										},
									]}
									direction="row"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`},{language:"tsx",snippet:`
			<RadioGroup
				name="radiogroup"
				options={[
					{
						label: 'Option1',
						value: '1',
					},
					{
						label: 'Option2',
						value: '2',
					},
				]}
				direction="row"
				useForm
				control={control}
			/>`,expandedSnippet:`
			import { SubmitHandler, useForm } from 'react-hook-form';
			import { RadioGroup } from '../RadioGroup';

			export const RadioGroupExample: FC = () => {
				const { control, handleSubmit } = useForm<{ radiogroup: string }>({
					defaultValues: {
						radiogroup: '',
					},
				});
			
				const onSubmit: SubmitHandler<{ radiogroup: string }> = ({ radiogroup }) => {
					alert(radiogroup);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<RadioGroup
									name="radiogroup"
									options={[
										{
											label: 'Option1',
											value: '1',
										},
										{
											label: 'Option2',
											value: '2',
										},
									]}
									direction="row"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`}],checkbox:[{language:"jsx",snippet:`
			<Checkbox
				name="checkbox"
				label="Is react-hook-form amazing?"
				useForm
				control={control}
			/>`,expandedSnippet:`
			import { useForm } from 'react-hook-form';
			import { Checkbox } from '../Checkbox';

			export const CheckboxExample= () => {
				const { control, handleSubmit } = useForm({
					defaultValues: {
						checkbox: true,
					},
				});
			
				const onSubmit = ({ checkbox }) => {
					alert(checkbox);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Checkbox
									name="checkbox"
									label="Is react-hook-form amazing?"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`},{language:"tsx",snippet:`
			<Checkbox
				name="checkbox"
				label="Is react-hook-form amazing?"
				useForm
				control={control}
			/>`,expandedSnippet:`
			import { SubmitHandler, useForm } from 'react-hook-form';
			import { Checkbox } from '../Checkbox';

			export const CheckboxExample: FC = () => {
				const { control, handleSubmit } = useForm<{ checkbox: boolean }>({
					defaultValues: {
						checkbox: true,
					},
				});
			
				const onSubmit: SubmitHandler<{ checkbox: boolean }> = ({ checkbox }) => {
					alert(checkbox);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Checkbox
									name="checkbox"
									label="Is react-hook-form amazing?"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`}],switch:[{language:"jsx",snippet:`<Switch
						name="_switch"
						label="I will use it!"
						useForm
						control={control}
					/>`,expandedSnippet:`
			import { useForm } from 'react-hook-form';
			import { Switch } from '../Switch';

			export const SwitchExample = () => {
				const { control, handleSubmit } = useForm({
					defaultValues: {
						_switch: true,
					},
				});
			
				const onSubmit = ({ _switch }) => {
					alert(_switch);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Switch
									name="_switch"
									label="I will use it!"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`},{language:"tsx",snippet:`<Switch
						name="_switch"
						label="I will use it!"
						useForm
						control={control}
					/>`,expandedSnippet:`
			import { SubmitHandler, useForm } from 'react-hook-form';
			import { Switch } from '../Switch';

			export const SwitchExample: FC = () => {
				const { control, handleSubmit } = useForm<{ _switch: boolean }>({
					defaultValues: {
						_switch: true,
					},
				});
			
				const onSubmit: SubmitHandler<{ _switch: boolean }> = ({ _switch }) => {
					alert(_switch);
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Switch
									name="_switch"
									label="I will use it!"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`}],formExample:[{language:"jsx",snippet:`
			const { control, handleSubmit } = useForm({
				defaultValues: {
					input: 'Careful, this is invalid...',
					select: 'Croatia',
					upload: [],
					datepicker: '',
					radiogroup: '1',
					checkbox: false,
					switch: true,
				},
			});

			const onSubmit = (data) => {
				alert(JSON.stringify(data));
			};

			return (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="row gap-2">
						<div className="col-md-12">
							<Input
								name="input"
								label="Email address"
								placeholder="Email address"
								fullWidth
								useForm
								helperText="Enter a valid email"
								control={control}
								rules={{
									pattern: {
										value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,
										message: 'Not a valid email address!',
									},
								}}
							/>
						</div>
						<div className="col-md-12">
							<Select
								name="select"
								label="Select country"
								options={[
									{
										label: 'Austria',
										value: 'Austria',
									},
									{
										label: 'Belgium',
										value: 'Belgium',
									},
									{
										label: 'Croatia',
										value: 'Croatia',
									},
								]}
								fullWidth
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-12">
							<Upload
								name="upload"
								multiple
								uploadLabel="Click or drag to upload a file"
								allowedFormats={['.png']}
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-12">
							<DatePicker name="datepicker" useForm control={control} />
						</div>
						<div className="col-md-4">
							<RadioGroup
								name="radiogroup"
								options={[
									{
										label: 'Option1',
										value: '1',
									},
									{
										label: 'Option2',
										value: '2',
									},
								]}
								direction="row"
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-4">
							<Checkbox
								name="checkbox"
								label="Is react-hook-form amazing?"
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-3">
							<Switch
								name="switch"
								label="I will use it!"
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-12">
							<Button
								label="Submit form"
								variant="contained"
								color="primary"
								fullWidth
								type="submit"
							/>
						</div>
					</div>
				</form>
			`,expandedSnippet:`
			import React from 'react';
			import { useForm } from 'react-hook-form';
			import { Button } from '../Button';
			import { Checkbox } from '../Checkbox';
			import { DatePicker } from '../DatePicker';
			import { Input } from '../Input';
			import { RadioGroup } from '../RadioGroup';
			import { Select } from '../Select';
			import { Switch } from '../Switch';
			import { Upload } from '../Upload';

			export const FormExample = () => {
				const { control, handleSubmit } = useForm({
					defaultValues: {
						input: 'Careful, this is invalid...',
						select: 'Croatia',
						upload: [],
						datepicker: '',
						radiogroup: '1',
						checkbox: false,
						switch: true,
					},
				});

				const onSubmit = (data) => {
					alert(JSON.stringify(data));
				};

				return (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Input
									name="input"
									label="Email address"
									placeholder="Email address"
									fullWidth
									useForm
									helperText="Enter a valid email"
									control={control}
									rules={{
										pattern: {
											value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,
											message: 'Not a valid email address!',
										},
									}}
								/>
							</div>
							<div className="col-md-12">
								<Select
									name="select"
									label="Select country"
									options={[
										{
											label: 'Austria',
											value: 'Austria',
										},
										{
											label: 'Belgium',
											value: 'Belgium',
										},
										{
											label: 'Croatia',
											value: 'Croatia',
										},
									]}
									fullWidth
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Upload
									name="upload"
									multiple
									uploadLabel="Click or drag to upload a file"
									allowedFormats={['.png']}
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<DatePicker name="datepicker" useForm control={control} />
							</div>
							<div className="col-md-4">
								<RadioGroup
									name="radiogroup"
									options={[
										{
											label: 'Option1',
											value: '1',
										},
										{
											label: 'Option2',
											value: '2',
										},
									]}
									direction="row"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-4">
								<Checkbox
									name="checkbox"
									label="Is react-hook-form amazing?"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-3">
								<Switch
									name="switch"
									label="I will use it!"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`},{language:"tsx",snippet:`
			interface IFormExample {
				input: string;
				select: string;
				upload: File[];
				datepicker: string;
				radiogroup: string;
				checkbox: boolean;
				switch: boolean;
			}
			
			const { control, handleSubmit } = useForm<IFormExample>({
				defaultValues: {
					input: 'Careful, this is invalid...',
					select: 'Croatia',
					upload: [],
					datepicker: '',
					radiogroup: '1',
					checkbox: false,
					switch: true,
				},
			});
		
			const onSubmit: SubmitHandler<IFormExample> = (data) => {
				alert(JSON.stringify(data));
			};
		
			return (
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="row gap-2">
						<div className="col-md-12">
							<Input
								name="input"
								label="Email address"
								placeholder="Email address"
								fullWidth
								useForm
								helperText="Enter a valid email"
								control={control}
								rules={{
									pattern: {
										value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,
										message: 'Not a valid email address!',
									},
								}}
							/>
						</div>
						<div className="col-md-12">
							<Select
								name="select"
								label="Select country"
								options={[
									{
										label: 'Austria',
										value: 'Austria',
									},
									{
										label: 'Belgium',
										value: 'Belgium',
									},
									{
										label: 'Croatia',
										value: 'Croatia',
									},
								]}
								fullWidth
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-12">
							<Upload
								name="upload"
								multiple
								uploadLabel="Click or drag to upload a file"
								allowedFormats={['.png']}
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-12">
							<DatePicker name="datepicker" useForm control={control} />
						</div>
						<div className="col-md-4">
							<RadioGroup
								name="radiogroup"
								options={[
									{
										label: 'Option1',
										value: '1',
									},
									{
										label: 'Option2',
										value: '2',
									},
								]}
								direction="row"
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-4">
							<Checkbox
								name="checkbox"
								label="Is react-hook-form amazing?"
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-3">
							<Switch
								name="switch"
								label="I will use it!"
								useForm
								control={control}
							/>
						</div>
						<div className="col-md-12">
							<Button
								label="Submit form"
								variant="contained"
								color="primary"
								fullWidth
								type="submit"
							/>
						</div>
					</div>
				</form>
			`,expandedSnippet:`
			import React, { FC } from 'react';
			import { SubmitHandler, useForm } from 'react-hook-form';
			import { Button } from '../Button';
			import { Checkbox } from '../Checkbox';
			import { DatePicker } from '../DatePicker';
			import { Input } from '../Input';
			import { RadioGroup } from '../RadioGroup';
			import { Select } from '../Select';
			import { Switch } from '../Switch';
			import { Upload } from '../Upload';
			
			export const FormExample: FC = () => {
				interface IFormExample {
					input: string;
					select: string;
					upload: File[];
					datepicker: string;
					radiogroup: string;
					checkbox: boolean;
					switch: boolean;
				}
			
				const { control, handleSubmit } = useForm<IFormExample>({
					defaultValues: {
						input: 'Careful, this is invalid...',
						select: 'Croatia',
						upload: [],
						datepicker: '',
						radiogroup: '1',
						checkbox: false,
						switch: true,
					},
				});
			
				const onSubmit: SubmitHandler<IFormExample> = (data) => {
					alert(JSON.stringify(data));
				};
			
				return (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="row gap-2">
							<div className="col-md-12">
								<Input
									name="input"
									label="Email address"
									placeholder="Email address"
									fullWidth
									useForm
									helperText="Enter a valid email"
									control={control}
									rules={{
										pattern: {
											value: /[a-z0-9]+@[a-z]+.[a-z]{2,3}/i,
											message: 'Not a valid email address!',
										},
									}}
								/>
							</div>
							<div className="col-md-12">
								<Select
									name="select"
									label="Select country"
									options={[
										{
											label: 'Austria',
											value: 'Austria',
										},
										{
											label: 'Belgium',
											value: 'Belgium',
										},
										{
											label: 'Croatia',
											value: 'Croatia',
										},
									]}
									fullWidth
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Upload
									name="upload"
									multiple
									uploadLabel="Click or drag to upload a file"
									allowedFormats={['.png']}
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<DatePicker name="datepicker" useForm control={control} />
							</div>
							<div className="col-md-4">
								<RadioGroup
									name="radiogroup"
									options={[
										{
											label: 'Option1',
											value: '1',
										},
										{
											label: 'Option2',
											value: '2',
										},
									]}
									direction="row"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-4">
								<Checkbox
									name="checkbox"
									label="Is react-hook-form amazing?"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-3">
								<Switch
									name="switch"
									label="I will use it!"
									useForm
									control={control}
								/>
							</div>
							<div className="col-md-12">
								<Button
									label="Submit form"
									variant="contained"
									color="primary"
									fullWidth
									type="submit"
								/>
							</div>
						</div>
					</form>
				);
			};
			`}]};function v(o){const t={p:"p",...x(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(F,{title:"How to/Guides/Forms"}),`
`,e.jsxs("div",{className:"content",children:[e.jsx("h1",{children:"Forms"}),e.jsx("p",{children:e.jsx(t.p,{children:`This guide's purpose is to provide Remira developers some information about
how to create forms and how to handle them using the control elements
provided by the UnifiedUI component library.`})}),e.jsx("h3",{children:"Why is a guide needed?"}),e.jsx("p",{children:e.jsxs(t.p,{children:["UnifiedUI's control elements are built on top of a library called ",e.jsx("a",{href:"https://react-hook-form.com/",target:"_BLANK",children:"react-hook-form"}),", which is really helpful when dealing with forms by providing several benefits over the traditional approach like:"]})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Performance"}),": declarative approach to form validation, which reduces the need of re-renders of the application (e.g. controlled states);"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lightweight, zero dependency overhead"}),": very light and does not rely on any external dependency, making it very easy and efficient to integrate;"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Native"}),": leverages native form validation capabilities, ensuring accessibility across browsers and technologies;"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error handling and Feedback"}),": provides built-in, clear to read error messages and feedbacks to users, allowing an easy correction of forms before submission, without the need of additional setup;"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Community"}),": is widely used and has a very big community making it easy to troubleshoot issues."]})]}),e.jsx("p",{children:e.jsx(t.p,{children:"Such library might be new and unknown for someone and for such matter providing some guidelines on how forms should be built is a must."})}),e.jsx("p",{children:e.jsxs(t.p,{children:["Keep in mind that some additional information can be gathered by looking at the ",e.jsx("a",{href:"https://react-hook-form.com/get-started",target:"_BLANK",children:"react-hook-form documentation"}),", you can also reach out to ",e.jsx("a",{href:"mailto:daniele.lopreiato@remira.com",target:"_BLANK",children:"Daniele Lo Preiato"})," if you have any question."]})}),e.jsx("h2",{children:"UnifiedUI's control elements"}),e.jsx("p",{children:e.jsx(t.p,{children:"UnifiedUI currently supports the following control elements in correlation with react-hook-form:"})}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Input"}),": used to collect text-based user input. It offers various input types, including text, password, email, number, and URL, to capture specific data formats from users;"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Select"}),": used to present a list of predefined options to users. It allows users to choose from a set of options, making it efficient for collecting data with limited choices;"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Upload"}),": used to allow users to upload files directly to the server. It's particularly useful for collecting attachments, documents, or other files as part of a submission process;"]}),e.jsxs("li",{children:[e.jsx("b",{children:"DatePicker"}),": used to capture user input regarding specific dates. It provides a visual interface for selecting dates, enhancing the user experience for entering date-related information;"]}),e.jsxs("li",{children:[e.jsx("b",{children:"RadioGroup"}),": used to present a group of mutually exclusive options. Users can only select one option within a radio group, making it suitable for collecting data related to single choices;"]}),e.jsxs("li",{children:[e.jsx("b",{children:"CheckBox"}),": used to collect multiple optional inputs. Users can check multiple checkboxes to select the applicable options, allowing for flexible input collection;"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Switch"}),": used to represent a binary state, typically representing true or false values. It's a visually appealing and intuitive way to gather simple on-off or yes-no type input."]})]}),e.jsx("h3",{children:"Input"}),e.jsxs("p",{children:["For more details, check out the ",e.jsx("a",{href:"/?path=/docs/unifiedui-input--docs",target:"_BLANK",children:"UnifiedUI's Input component documentation"}),"."]}),e.jsx(r,{centered:!0,snippets:i.input,children:e.jsx(c,{})}),e.jsx("h3",{children:"Select"}),e.jsxs("p",{children:["For more details, check out the ",e.jsx("a",{href:"/?path=/docs/unifiedui-select--docs",target:"_BLANK",children:"UnifiedUI's Select component documentation"}),"."]}),e.jsx(r,{centered:!0,snippets:i.select,children:e.jsx(d,{})}),e.jsx("h3",{children:"Upload"}),e.jsxs("p",{children:["For more details, check out the ",e.jsx("a",{href:"/?path=/docs/unifiedui-upload--docs",target:"_BLANK",children:"UnifiedUI's Upload component documentation"}),"."]}),e.jsx(r,{centered:!0,snippets:i.upload,children:e.jsx(m,{})}),e.jsx("h3",{children:"DatePicker"}),e.jsxs("p",{children:["For more details, check out the ",e.jsx("a",{href:"/?path=/docs/unifiedui-datepicker--docs",target:"_BLANK",children:"UnifiedUI's DatePicker component documentation"}),"."]}),e.jsx(r,{centered:!0,snippets:i.datePicker,children:e.jsx(u,{})}),e.jsx("h3",{children:"RadioGroup"}),e.jsxs("p",{children:["For more details, check out the ",e.jsx("a",{href:"/?path=/docs/unifiedui-radiogroup--docs",target:"_BLANK",children:"UnifiedUI's RadioGroup component documentation"}),"."]}),e.jsx(r,{centered:!0,snippets:i.radioGroup,children:e.jsx(p,{})}),e.jsx("h3",{children:"Checkbox"}),e.jsxs("p",{children:["For more details, check out the ",e.jsx("a",{href:"/?path=/docs/unifiedui-checkbox--docs",target:"_BLANK",children:"UnifiedUI's Checkbox component documentation"}),"."]}),e.jsx(r,{centered:!0,snippets:i.checkbox,children:e.jsx(h,{})}),e.jsx("h3",{children:"Switch"}),e.jsxs("p",{children:["For more details, check out the ",e.jsx("a",{href:"/?path=/docs/unifiedui-switch--docs",target:"_BLANK",children:"UnifiedUI's Switch component documentation"}),"."]}),e.jsx(r,{centered:!0,snippets:i.switch,children:e.jsx(b,{})}),e.jsx("h2",{children:"How to build a form"}),e.jsxs("p",{children:["To build a form using the react-hook-form library and the UnifiedUI's control elements, it is required to wrap the fields in a form tag and use the useForm hook to create a ",e.jsx("b",{children:'"control"'})," over it."]}),e.jsx("h3",{children:"useForm* property"}),e.jsxs("p",{children:["Every control elements accepts the boolean useForm property, this will enable the interaction with the react-hook-form library, ",e.jsx("u",{children:"if and only if the control element resides in a form element"}),"."]}),e.jsx("h3",{children:"control* property"}),e.jsx("p",{children:"To add the binding between control elements and the react-hook-form library and enable all functionalities, the control element that is instantiated using the useForm hook must be passed down as a property to every control element."}),e.jsx("h3",{children:"rules property"}),e.jsxs("p",{children:["It is possible to add validation to control elements by passing the rules property, which is not mandatory. Want to know more about rules? Take a look ",e.jsx("a",{href:"https://www.react-hook-form.com/api/useform/register/#options",target:"_BLANK",children:"here"}),"."]}),e.jsx("h3",{children:"Form showcase"}),e.jsx(r,{centered:!0,snippets:i.formExample,children:e.jsx(f,{})}),e.jsx("hr",{}),e.jsx("p",{children:e.jsxs(t.p,{children:["Please, keep in mind that some things might not be covered here and that this guide might be updated in the future. If you find any typo or something that is wrong, please contact ",e.jsx("a",{href:"mailto:daniele.lopreiato@remira.com",target:"_BLANK",children:"Daniele Lo Preiato"}),". If something is still not clear to you, please refer to the ",e.jsx("a",{href:"https://react-hook-form.com/get-started",target:"_BLANK",children:"documentation"})," of the react-hook-form library. If the documentation does not help you at all, please don't hesitate to contact someone in the frontend team."]})})]})]})}function G(o={}){const{wrapper:t}={...x(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(v,{...o})}):v(o)}export{G as default};

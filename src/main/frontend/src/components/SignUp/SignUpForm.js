import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Grid, Box, MenuItem, FormControl, Autocomplete,
    InputLabel, Select, TextField, Button, styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LongButton from "../Styles/LongButton.js";
import NextButton from "./NextButton.js";
import CustomTextField from '../Styles/CustomTextField.js';
import Background from "../Background";
import EmailAlert from './EmailAlert';

const SignUpForm = ({ marginBottom }) => {

    const { register, handleSubmit, formState: { errors }, setValue, watch, control } = useForm();
    const [alertOpen, setOpen] = React.useState(false);
    const userType = watch('userType'); // 폼 필드 값 관찰
    const [redirectPath, setRedirectPath] = useState(null); // 리다이렉션 경로 상태
    const formSx = { // 폼 스타일
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '50px',
        flexDirection: 'column', // 요소들을 세로로 정렬
        maxHeight: 'calc(100vh - 100px)', // 전체 화면에서 일정 높이를 제외한 만큼의 최대 높이 설정
        overflowY: 'auto', // 세로 스크롤만 활성화
    };
    const handleClickOpen = () => { // 알림창 열림 함수
        setOpen(true);
    };
    const handleClose = () => { // 알림창 닫힘 함수
        setOpen(false);
    };
    const [role, setRole] = useState(''); // 현재 선택된 역할을 관리하는 상태
    
    // 페이지 이동 부분 const
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
    const onNextClick = () => {    // 로그인 페이지로 이동하도록
        navigate('/login');
    };
    // 역할 부분 const
    const [category, setCategory] = useState('');
    
    // 소속 부분 const
    const [org, setOrg] = useState('');
    const [customOrg, setCustomOrg] = useState('');  // 별도의 직접 입력 값을 위한 상태
    const [isCustomInput, setIsCustomInput] = useState(false);  // 직접 입력 활성화 상태
    const handleOrgChange = (event) => {
        const value = event.target.value;
        setOrg(value);
        setIsCustomInput(value === 'custom');  // '직접 입력'이 선택되면 입력 필드를 활성화
        if (value !== 'custom') {
            setCustomOrg('');  // '직접 입력'이 아니면 입력 필드 초기화
        }
    };
    // 날짜 선택 부분 const
    const [startdate, setStartdate] = React.useState(null);
    // 이메일 인증 부분 const
    const [openRegister, setOpenRegister] = useState(false);
    const handleClickOpenRegister = () => {
        setOpenRegister(true);
    };
    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

    return (
        <Background
            name="회원가입"
            contents={
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: '50px' }}>
                <div>
                    <CustomTextField
                        label="이름"
                        id="name"
                        {...register("name", { required: "이름을 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        style={{ marginBottom: errors.name ? '0px' : '23px' }}
                    />
                </div>
                <div>
                    <CustomTextField
                        label="아이디"
                        id="id"
                        {...register("id", {
                            required: "아이디를 입력해주세요.",
                            pattern: {
                                value: /^[A-Za-z0-9]+$/,
                                message: "영어와 숫자만 입력 가능합니다.",
                            },
                            minLength: {
                                value: 5,
                                message: "아이디는 5글자 이상이어야 합니다.",
                            },
                            maxLength: {
                                value: 30,
                                message: "아이디는 30글자 이하이어야 합니다.",
                            },
                        })}
                        // inputProps={{ maxLength: 30 }}
                        error={!!errors.id}
                        helperText={errors.id?.message}
                        style={{ marginBottom: errors.id ? '0px' : '23px' }}
                    />
                </div>
                <div>
                   <CustomTextField
                        label="이메일"
                        id="email"
                        {...register("email", { required: "이메일을 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        style={{ marginBottom: errors.email ? '0px' : '23px' }}
                    /> 
                </div>
                <Button variant="contained" color="primary" onClick={handleClickOpenRegister}>
                    이메일 인증
                </Button>
                <EmailAlert open={openRegister} handleClose={handleCloseRegister} />
                <div>
                   <CustomTextField
                        label="비밀번호"
                        id="pw"
                        {...register("pw", { required: "비밀번호를 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.pw}
                        helperText={errors.pw?.message}
                        style={{ marginBottom: errors.pw ? '0px' : '23px' }}
                    /> 
                </div>
                <div>
                    <CustomTextField
                        label="비밀번호 재확인"
                        id="pw"
                        {...register("pw", { required: "비밀번호를 다시 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.pw}
                        helperText={errors.pw?.message}
                        style={{ marginBottom: errors.pw ? '0px' : '23px' }}
                    />
                </div>
                <div>
                    <CustomTextField
                        label="전화번호"
                        id="phone"
                        {...register("phone", { required: "전화번호를 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        style={{ marginBottom: errors.phone ? '0px' : '23px' }}
                    />
                </div>
                <div>
                    <CustomTextField
                        margin="normal"
                        fullWidth
                        select // drop down 메뉴로 사용하기 위해 select 속성 추가
                        label="구분"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="director">관공서</MenuItem>
                        <MenuItem value="host">행사 관리자</MenuItem>
                    </CustomTextField>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <DemoContainer components={['DatePicker']}> */}
                            <DatePicker label="시작 날짜"
                            renderInput={(params) => <CustomTextField {...params} />} 
                            />
                        {/* </DemoContainer> */}
                    </LocalizationProvider>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        {/* <DemoContainer components={['DatePicker']}> */}
                            <DatePicker label="종료 날짜"
                            renderInput={(params) => <CustomTextField {...params} />} 
                            />
                        {/* </DemoContainer> */}
                    </LocalizationProvider>
                </div>
                <div>
                    <CustomTextField
                        margin="normal"
                        fullWidth
                        select
                        label="소속"
                        value={org}
                        onChange={handleOrgChange}
                    >
                        <MenuItem value="custom">직접 입력</MenuItem>
                        <MenuItem value="3">청와대</MenuItem>
                        <MenuItem value="4">도청</MenuItem>
                        <MenuItem value="5">구청</MenuItem>
                        <MenuItem value="6">시청</MenuItem>
                        <MenuItem value="7">군청</MenuItem>
                        <MenuItem value="8">동사무소</MenuItem>
                        <MenuItem value="9">소방본부</MenuItem>
                        <MenuItem value="10">소방서</MenuItem>
                        <MenuItem value="11">경찰청</MenuItem>
                        <MenuItem value="12">지방해양경찰청</MenuItem>
                        <MenuItem value="13">경찰소</MenuItem>
                        <MenuItem value="14">지역 병원 응급실</MenuItem>
                    </CustomTextField>
                    {isCustomInput && (
                        <CustomTextField
                            fullWidth
                            label="직접 입력"
                            value={customOrg}
                            onChange={(e) => setCustomOrg(e.target.value)}
                            margin="normal"
                        />
                    )}
                </div>
                <div>
                    <CustomTextField
                        label="소속 전화번호"
                        id="org_phone"
                        {...register("org_phone", { required: "소속 전화번호를 입력해주세요." })}
                        inputProps={{ maxLength: 30 }}
                        error={!!errors.org_phone}
                        helperText={errors.org_phone?.message}
                        style={{ marginBottom: errors.org_phone ? '0px' : '23px' }}
                    />
                </div>
                <div>
                    <NextButton type="submit" onClick={onNextClick}>완료</NextButton>
                </div>
            </Box>
            }
        />
    );
};

export default SignUpForm;
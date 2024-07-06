import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import ApprovalAlert from './ApprovalAlert';
import { useTheme } from '@mui/material/styles';

// TableContainer 스타일
const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
}));

// TableHead 스타일
const CustomTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.secondary,
}));

// TableCell 스타일
const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

// 상태 박스 스타일
const StatusBox = styled(Box)(({ status, theme }) => ({
    backgroundColor: status === '1' ? theme.palette.comp : status === '0' ? theme.palette.warn : theme.palette.prog,
    color: theme.palette.text.primary,
    padding: '6px 12px',
    borderRadius: '12px',
    textTransform: 'none',
    display: 'inline-block',
    textAlign: 'center',
    width: "80%",
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const ReplyInquiry = () => {
  const theme = useTheme();
  // 임시 데이터 설정
  const initialData = [
    { id: 'id01', name: 'Christine', email: 'Christine@email.com', phone: '010-1234-5678', role_index: '관공서', start_date: '2024-01-01', end_date: '2024-12-31', apply_date: '2023-12-01', permission_yn: null, org: 'Company A', org_phone: '02-123-4567' },
    { id: 'sfvtt', name: 'John', email: 'john@email.com', phone: '010-2345-6789', role_index: '행사 담당자', start_date: '2024-02-01', end_date: '2024-12-31', apply_date: '2023-12-02', permission_yn: null, org: 'Company B', org_phone: '02-234-5678' },
    { id: 'aaaaaaa', name: 'Sarah', email: 'sarah@email.com', phone: '010-3456-7890', role_index: '행사 담당자', start_date: '2024-03-01', end_date: '2024-12-31', apply_date: '2023-12-03', permission_yn: '0', org: 'Company C', org_phone: '02-345-6789' },
    { id: 'wertgfd', name: 'Michael', email: 'michael@email.com', phone: '010-4567-8901', role_index: '행사 담당자', start_date: '2024-04-01', end_date: '2024-12-31', apply_date: '2023-12-04', permission_yn: '1', org: 'Company D', org_phone: '02-456-7890' },
    { id: 'qerqfgf', name: 'Alice', email: 'alice@email.com', phone: '010-5678-9012', role_index: '관공서', start_date: '2024-05-01', end_date: '2024-12-31', apply_date: '2023-12-05', permission_yn: null, org: 'Company E', org_phone: '02-567-8901' },
    { id: 'asdfww', name: 'Bob', email: 'bob@email.com', phone: '010-6789-0123', role_index: '관공서', start_date: '2024-06-01', end_date: '2024-12-31', apply_date: '2023-12-06', permission_yn: '1', org: 'Company F', org_phone: '02-678-9012' },
  ];

  // 상태 관리 변수
  const [data, setData] = useState(initialData);
  const [openApproval, setOpenApproval] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // 데이터 가져오기
  useEffect(() => {
    // axios.get('/api/inquiries')
    //   .then(response => {
    //     setData(response.data);
    //   })
    //   .catch(error => {
    //     console.error('데이터를 가져오는 중 오류가 발생했습니다!', error);
    //   });
  }, []);

  // 데이터 삭제 함수
  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  // 승인 상태 변경 팝업 열기
  const handleOpenApproval = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpenApproval(true);
  };

  // 승인 상태 변경 팝업 닫기
  const handleCloseApproval = () => {
    setOpenApproval(false);
    setSelectedInquiry(null);
  };

  // 승인, 거절 처리 함수
  const handleApprovalOrRejection = (status) => {
    setData(data.map((row) => 
      row.id === selectedInquiry.id ? { ...row, permission_yn: status } : row
    ));
    handleCloseApproval();
  };

  return (
    <>
        <CustomTableContainer component={Paper}>
        <Table>
            <CustomTableHead>
            <TableRow>
                <TableCell sx={{ width: '10%' }}>아이디</TableCell>
                <TableCell sx={{ width: '25%' }}>이메일</TableCell>
                <TableCell sx={{ width: '20%' }}>구분</TableCell>
                <TableCell sx={{ width: '20%' }}>신청 날짜</TableCell>
                <TableCell sx={{ width: '15%' }}>승인 여부</TableCell>
                <TableCell sx={{ width: '10%' }}></TableCell>
            </TableRow>
            </CustomTableHead>
            <TableBody>
            {data.map((row) => (
              <CustomTableRow key={row.id} onClick={() => handleOpenApproval(row)}>
                <CustomTableCell>{row.id}</CustomTableCell>
                <CustomTableCell>{row.email}</CustomTableCell>
                <CustomTableCell>{row.role_index}</CustomTableCell>
                <CustomTableCell>{row.apply_date}</CustomTableCell>
                <CustomTableCell>
                    <StatusBox status={row.permission_yn}>{row.permission_yn === null ? '진행중' : row.permission_yn === '1' ? '승인' : '거절'}</StatusBox>
                </CustomTableCell>
                <CustomTableCell>
                    <Button sx={{ color: theme.palette.text.primary }} onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}>✕</Button>
                </CustomTableCell>
              </CustomTableRow>
            ))}
            </TableBody>
        </Table>
        </CustomTableContainer>
        {selectedInquiry && <ApprovalAlert open={openApproval} handleClose={handleCloseApproval} handleApprovalOrRejection={handleApprovalOrRejection} inquiry={selectedInquiry} />}
    </>
  );
}

export default ReplyInquiry;
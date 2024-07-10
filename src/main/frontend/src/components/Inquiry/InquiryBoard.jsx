import React, { useState } from 'react';
import { styled, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RegisterAlert from './RegisterAlert';
import ReplyAlert from './ReplyAlert';
import { useTheme } from '@mui/material/styles';

// 문의 데이터 예시
const inquiries = [
  { 
    id: 1, 
    category: '[카테고리] 제목', 
    title: 'Makeup', 
    status: '대기', 
    inquiryDate: '2024-06-26', 
    replyDate: '', 
    content: '메이크업 제품에 대한 문의 내용입니다.'
  },
  { 
    id: 2, 
    category: '', 
    title: 'Asus Laptop', 
    status: '완료', 
    inquiryDate: '2024-06-20', 
    replyDate: '2024-06-25', 
    content: 'Asus 노트북에 대한 문의 내용입니다.', 
    reply: 'Asus 노트북에 대한 답변 내용입니다.\n\n문제의 원인을 파악한 결과, 드라이버 업데이트가 필요합니다.\n추가로, 배터리 문제는 서비스 센터에서 점검 받으시길 권장드립니다.'
  },
  { 
    id: 3, 
    category: '', 
    title: 'Iphone X', 
    status: '완료', 
    inquiryDate: '2024-06-15', 
    replyDate: '2024-06-25', 
    content: 'Iphone X에 대한 문의 내용입니다.', 
    reply: 'Iphone X에 대한 답변 내용입니다.\n\n소프트웨어 업데이트 후 문제가 해결되지 않으면, 가까운 애플 스토어를 방문해주세요.\n또한, 배터리 성능 저하 문제는 교체가 필요할 수 있습니다.'
  },
];


// 컨테이너 스타일
const containerStyle = {
  width: '100%',
  padding: 3,
};

// 행 스타일
const CustomTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
}));

// 헤더 스타일
const headerStyle = (theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
});

// 테이블 헤더 스타일
const tableHeaderStyle = (theme) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default
});

// 테이블 셀 스타일
const tableCellStyle = (theme) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
});

const InquiryBoard = () => {
  const theme = useTheme();

  // 페이지네이션
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // 등록 다이얼로그 열림 상태 관리
  const [openRegister, setOpenRegister] = useState(false);
  // 답변 다이얼로그 열림 상태 관리
  const [openReply, setOpenReply] = useState(false);
  // 선택된 문의 관리
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // 등록 다이얼로그 열기
  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };

  // 등록 다이얼로그 닫기
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  // 답변 다이얼로그 열기
  const handleClickOpenReply = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpenReply(true);
  };

  // 답변 다이얼로그 닫기
  const handleCloseReply = () => {
    setOpenReply(false);
    setSelectedInquiry(null);
  };

  return (
    <Box sx={containerStyle}>
      {/* 내용 */}
        <Box sx={headerStyle(theme)}>
          <Typography variant="h6">내 문의목록</Typography>
          {/* 새 문의 버튼 */}
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenRegister}>
            새 문의
          </Button>
        </Box>
        <TableContainer sx={{borderRadius: "15px 15px 0px 0px"}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyle(theme)}>번호</TableCell>
                <TableCell sx={tableHeaderStyle(theme)}>제목</TableCell>
                <TableCell sx={tableHeaderStyle(theme)}>상태</TableCell>
                <TableCell sx={tableHeaderStyle(theme)}>문의 날짜</TableCell>
                <TableCell sx={tableHeaderStyle(theme)}>답변 날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inquiries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((inquiry) => (
                // 각 문의 항목을 클릭하면 답변 다이얼로그 열기
                <CustomTableRow key={inquiry.id} onClick={() => handleClickOpenReply(inquiry)} sx={{ cursor: 'pointer' }}>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.id}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.title}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.status}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.inquiryDate}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.replyDate}</TableCell>
                </CustomTableRow>
              ))}
            </TableBody>
          </Table>
          {inquiries && <TablePagination
            component="div"
            count={inquiries.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />}
        </TableContainer>
      {/* 등록 다이얼로그 */}
      <RegisterAlert open={openRegister} handleClose={handleCloseRegister} />
      {/* 답변 다이얼로그 */}
      {selectedInquiry && <ReplyAlert open={openReply} handleClose={handleCloseReply} inquiry={selectedInquiry} />}
    </Box>
  );
};

export default InquiryBoard;

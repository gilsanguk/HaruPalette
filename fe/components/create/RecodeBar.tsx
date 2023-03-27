import { ColorTypes } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/reduxHook';
import useTheme from '../../hooks/useTheme';
import { selectScript } from '../../store/modules/script';
import AudioRecorder from '../../types/recodeTypes';
import RecodeProgressBar from './RecodeProgresssBar';
import SaveButton from './SaveButton';
import StopButton from './StopButton';

const RecodeContainer = styled.div`
  position: absolute;
  top: 70vh;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 20rem;
  height: 6rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;

  width: 80%;
  margin: 0 auto;
`;

const MusicProgress = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  cursor: pointer;
`;

const MusicProgressTime = styled.div`
  position: absolute;
  top: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MusicCurrentTime = styled.h4<{ theme: ColorTypes }>`
  color: ${props => props.theme.color};
  font-size: 12px;
  opacity: 1;
`;

const MusicDurationTime = styled.h4<{ theme: ColorTypes }>`
  color: ${props => props.theme.color};
  font-size: 12px;
  opacity: 1;
`;

function RecodeBar(props: { audioRecorder: AudioRecorder }) {
  const { audioRecorder } = props;
  const theme = useTheme();
  const [second, setSecond] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const isPause = useAppSelector(selectScript).isPausing;

  useEffect(() => {
    if (second < 60 && !isPause) {
      setTimeout(() => {
        setSecond(second + 0.1);
      }, 100);
    } else if (second >= 60 && !isPause) {
      setSecond(0);
      setMinute(1);
      audioRecorder.stopRecording();
    }
  }, [second, isPause]);

  return (
    <RecodeContainer>
      <RecodeProgressBar second={second} />
      <MusicProgress>
        <MusicProgressTime>
          <MusicCurrentTime theme={theme}>
            {Math.floor(minute).toString().padStart(2, '0')}:
            {Math.floor(second).toString().padStart(2, '0')}
          </MusicCurrentTime>
          {second > 50 ? (
            <h5>{60 - Math.floor(second)} 초 후 자동으로 대화가 종료됩니다.</h5>
          ) : (
            <div />
          )}
          <MusicDurationTime theme={theme}>01:00</MusicDurationTime>
        </MusicProgressTime>
      </MusicProgress>
      <ButtonContainer>
        <StopButton audioRecorder={audioRecorder} />
        <SaveButton audioRecorder={audioRecorder} />
      </ButtonContainer>
    </RecodeContainer>
  );
}

export default RecodeBar;

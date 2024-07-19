package lt.techin.ovidijus.back.service;

import lombok.AllArgsConstructor;
import lt.techin.ovidijus.back.dto.FollowerResponseDTO;
import lt.techin.ovidijus.back.exceptions.UserNotFoundException;
import lt.techin.ovidijus.back.model.Follower;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.FollowerRepository;
import lt.techin.ovidijus.back.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FollowerService {

    private final FollowerRepository followerRepository;
    private final UserRepository userRepository;

    public FollowerResponseDTO createFollower(Long idWho, Long idWhat) {
        User userWho = this.userRepository.findById(idWho).orElseThrow(() -> new UserNotFoundException("Not found user by id = "+idWho));
        User userWhat = this.userRepository.findById(idWhat).orElseThrow(() -> new UserNotFoundException("Not found user by id = "+idWhat));

        Follower follower = new Follower();
        follower.setFollowWho(userWho);
        follower.setFollowWhat(userWhat);
        this.followerRepository.save(follower);

        FollowerResponseDTO followerResponseDTO = new FollowerResponseDTO();
        followerResponseDTO.setId(follower.getId());
        followerResponseDTO.setFollowWhoUserId(follower.getFollowWho().getId());
        followerResponseDTO.setFollowWhatUserId(follower.getFollowWhat().getId());
        return followerResponseDTO;
    }

    public boolean isFollowing(Long idWho, Long idWhat) {
        User userWho = this.userRepository.findById(idWho).orElseThrow(() -> new UserNotFoundException("Not found user by id = "+idWho));
        User userWhat = this.userRepository.findById(idWhat).orElseThrow(() -> new UserNotFoundException("Not found user by id = "+idWhat));

        List<Follower> followers = this.followerRepository.getByFollowWhoAndFollowWhat(userWho, userWhat);
        return !followers.isEmpty();
    }

    public void deleteFollower(Long idWho, Long idWhat) {
        User userWho = this.userRepository.findById(idWho).orElseThrow(() -> new UserNotFoundException("Not found user by id = "+idWho));
        User userWhat = this.userRepository.findById(idWhat).orElseThrow(() -> new UserNotFoundException("Not found user by id = "+idWhat));

        List<Follower> followers = this.followerRepository.getByFollowWhoAndFollowWhat(userWho, userWhat);
        for(Follower follower: followers){
            this.followerRepository.delete(follower);
        }
    }
}

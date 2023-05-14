package com.pz.designmatch.comissions;


import com.pz.designmatch.model.Commission;
import com.pz.designmatch.model.enums.*;
import com.pz.designmatch.repository.CommissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class commissionService {
    private CommissionRepository commissionRepository;

    public commissionService(CommissionRepository commissionRepository) {
        this.commissionRepository = commissionRepository;
    }

    private commissionDto mapToCommissionDto(Commission commission){
        if(commission == null){
            return null;
        }
        return new commissionDto(
                commission.getTitle(),
                commission.getDescription(),
                commission.getDeadline(),
                commission.getLevel().stream().limit(3).map(Level::getDisplayName).collect(Collectors.toSet()),
                commission.getLanguages().stream().limit(3).map(Language::getDisplayName).collect(Collectors.toSet()),
                commission.getLocation().stream().limit(2).map(City::getDisplayName).collect(Collectors.toSet()),
                commission.getSkills().stream().limit(2).map(Skill::getDisplayName).collect(Collectors.toSet()),
                commission.getTags().stream().limit(2).map(Tag::getDisplayName).collect(Collectors.toSet()),
                commission.getStawka()
        );
    }

    public commissionDto getCommissionDtoByID(Long id){
        return commissionRepository.findById(id).map(this::mapToCommissionDto)
                        .orElseThrow(() -> new RuntimeException("Commission not found for title: " + id));
    }

    @Transactional
    public commissionDto CreateCommission(commissionDto commissionDto){
        Commission newCommission = new Commission();
        newCommission.setTitle(commissionDto.getTitle());
        newCommission.setDescription(commissionDto.getDescription());
        newCommission.setDeadline(commissionDto.getDeadline());
        newCommission.setCommissionedAt(LocalDateTime.now());
        newCommission.setLevel(commissionDto.getLevel().stream().map(Level::fromDisplayName).collect(Collectors.toSet()));
        newCommission.setLocation(commissionDto.getLocation().stream().map(City::fromDisplayName).collect(Collectors.toSet()));
        newCommission.setLanguages(commissionDto.getLanguages().stream().map(Language::fromDisplayName).collect(Collectors.toSet()));
        newCommission.setSkills(commissionDto.getSkills().stream().map(Skill::fromDisplayName).collect(Collectors.toSet()));
        newCommission.setTags(commissionDto.getTags().stream().map(Tag::fromDisplayName).collect(Collectors.toSet()));
        newCommission.setStawka(commissionDto.getStawka());
        newCommission.setCompleted(false);
        return mapToCommissionDto(commissionRepository.save(newCommission));
    }


    @Transactional
    public commissionDto UpdateOrCreateCommissionByTitle(String title, commissionDto commissionDto){
        Optional<Commission> commission = commissionRepository.findByTitle(title);
//        if(commission.isEmpty()){
//            Commission newCommission = new Commission();
//            newCommission.setTitle(commissionDto.getTitle());
//            commissionRepository.save(newCommission);
//            commission = commissionRepository.findByTitle(commissionDto.getTitle());
//        }
        Commission existingCommission = commission.get();

        if(commissionDto.getDescription() != null){
            existingCommission.setDescription(commissionDto.getDescription());
        }
        if(commissionDto.getDeadline() != null){
            existingCommission.setDeadline(commissionDto.getDeadline());
        }
        if(commissionDto.getLevel() != null){
            existingCommission.setLevel(commissionDto.getLevel().stream().map(Level::fromDisplayName).collect(Collectors.toSet()));
        }
        if(commissionDto.getLocation() != null){
            existingCommission.setLocation(commissionDto.getLocation().stream().map(City::fromDisplayName).collect(Collectors.toSet()));
        }
        if(commissionDto.getLanguages() != null){
            existingCommission.setLanguages(commissionDto.getLanguages().stream().map(Language::fromDisplayName).collect(Collectors.toSet()));
        }
        if(commissionDto.getSkills() != null){
            existingCommission.setSkills(commissionDto.getSkills().stream().map(Skill::fromDisplayName).collect(Collectors.toSet()));
        }
        if(commissionDto.getTags() != null){
            existingCommission.setTags(commissionDto.getTags().stream().map(Tag::fromDisplayName).collect(Collectors.toSet()));
        }
        if(commissionDto.getStawka() != null){
            existingCommission.setStawka(commissionDto.getStawka());
        }
        return mapToCommissionDto(commissionRepository.save(existingCommission));
    }

    public commissionDto setCommissionComplited(Long id){
        Optional<Commission> optionalCommission= commissionRepository.findById(id);
        if(optionalCommission.isEmpty()){
            throw new RuntimeException("Te zlecenie nie istnieje");
        }
        Commission existingCommission = optionalCommission.get();
        existingCommission.setCompleted(true);
        existingCommission.setCompletedAt(LocalDateTime.now());
        return mapToCommissionDto(commissionRepository.save(existingCommission));
    }
}

//         Commission existingCommission;
//        if(commission.isEmpty()){
//            // Создание нового commission
//            Commission newCommission = new Commission();
//            existingCommission = newCommission;
//            existingCommission.setTitle(commissionDto.getTitle());
//        } else {
//            // Использование существующего commission
//            existingCommission = commission.get();
//        }



//    Optional<Commission> commission = commissionRepository.findByTitle(commissionDto.getTitle());
//        if(commission.isEmpty()){
//                Commission newCommission = new Commission();
//                newCommission.setTitle(commissionDto.getTitle());
//                commissionRepository.save(newCommission);
//                commission = commissionRepository.findByTitle(commissionDto.getTitle());
//                }
//                Commission existingCommission = commission.get();